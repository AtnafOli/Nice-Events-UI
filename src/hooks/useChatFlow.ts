import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import {
  ActiveTab,
  ConversationFlowState,
  Message,
  EventDetails,
  VendorRequest,
} from "@/lib/chatTypes";
import { EVENT_API_ENDPOINT, VENDOR_API_ENDPOINT } from "@/lib/chatConstants";

export function useChatFlow(initialTab: ActiveTab = "vendor") {
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);
  const [currentFlowState, setCurrentFlowState] =
    useState<ConversationFlowState>("INITIAL");
  const [messages, setMessages] = useState<Message[]>([]);
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    eventType: "",
    guestCount: 0,
    location: "",
  });
  const [vendorRequest, setVendorRequest] = useState<VendorRequest>({
    service: "",
    budget: 0,
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const messageCounter = useRef(0);

  const addMessage = useCallback((type: Message["type"], text: string) => {
    setMessages((prev) => [
      ...prev,
      { type, text, id: `msg-${messageCounter.current++}` },
    ]);
  }, []);

  /** Render vendor services as markdown list with clickable links */
  const formatVendorServices = (services: any[]): string => {
    let out = "🛎️ <strong>Vendor Recommendations</strong>:<br><br>";
    services.forEach((svc, i) => {
      const reviews = Array.isArray(svc.reviewService) ? svc.reviewService : [];
      const avgRating =
        reviews.length > 0
          ? (
              reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
              reviews.length
            ).toFixed(1)
          : "N/A";

      out += `${i + 1}. <a href="/service/detail/${
        svc.id
      }" style="color: blue; text-decoration: underline;">${svc.name}</a><br>`;
      out += `&nbsp;&nbsp;&bull; Category: ${svc.subCategory?.name || "—"}<br>`;
      out += `&nbsp;&nbsp;&bull; Business: ${
        svc.vendor?.businessName || "—"
      }<br>`;
      out += `&nbsp;&nbsp;&bull; Price: ${Number(
        svc.basicPrice
      ).toLocaleString()}<br>`;
      out += `&nbsp;&nbsp;&bull; Rating: ${avgRating} ⭐  (${reviews.length} reviews)<br><br>`;
    });
    return out.trim();
  };

  /** Main formatter for both flows */
  const formatRecommendation = (data: any, type: ActiveTab): string => {
    if (type === "vendor" && Array.isArray(data.services)) {
      return formatVendorServices(data.services);
    }

    let out = "";

    if (data.budgetEstimate) {
      const { min, max, currency } = data.budgetEstimate;
      out += `💰 **Estimated Budget**: ${min.toLocaleString()} – ${max.toLocaleString()} ${currency}\n\n`;
    }

    if (type === "event") {
      if (Array.isArray(data.steps) && data.steps.length) {
        out += `📋 **Event Steps**:\n`;
        data.steps.forEach((step: string, i: number) => {
          out += `${i + 1}. ${step}\n`;
        });
        out += `\n`;
      }
      if (Array.isArray(data.considerations) && data.considerations.length) {
        out += `💡 **Event Considerations**:\n`;
        data.considerations.forEach((tip: string) => {
          out += `• ${tip}\n`;
        });
      }
    }

    return out.trim();
  };

  /** Sends collected data to the appropriate endpoint */
  const processCollectedData = useCallback(
    async (
      override: Partial<EventDetails> | Partial<VendorRequest> | null = null
    ) => {
      setIsLoading(true);
      addMessage("bot", "Processing your request...");
      setCurrentFlowState("PROCESSING");

      try {
        let responseData: any;

        if (activeTab === "vendor") {
          const req: VendorRequest = {
            ...vendorRequest,
            ...(override as Partial<VendorRequest>),
          };
          console.log(req);

          const { data } = await axios.get(
            `${VENDOR_API_ENDPOINT}?serviceName=${req.service}&budget=${req.budget}&location=${req.location}`
          );

          responseData = data.data;
        } else {
          const req: EventDetails = {
            ...eventDetails,
            ...(override as Partial<EventDetails>),
          };

          const { data } = await axios.post(EVENT_API_ENDPOINT, {
            ...req,
          });
          responseData = data;
        }

        const reply = formatRecommendation(responseData, activeTab);
        addMessage("bot", reply);
        setCurrentFlowState("PROCESSING");
      } catch (error) {
        console.error("Processing error:", error);
        addMessage(
          "bot",
          "Sorry, something went wrong while processing your request. Please try again."
        );
        setCurrentFlowState("PROCESSING");
      } finally {
        setIsLoading(false);
      }
    },
    [activeTab, eventDetails, vendorRequest, addMessage]
  );

  const handleOptionSelect = useCallback(
    (value: string) => {
      if (optionsLocked) return;
      addMessage("user", value);
      setOptionsLocked(true);

      let nextState = currentFlowState;
      let nextQuestion = "";

      if (activeTab === "event") {
        switch (currentFlowState) {
          case "ASKING_EVENT_TYPE":
            setEventDetails((prev) => ({ ...prev, eventType: value }));
            nextState = "ASKING_GUEST_COUNT";
            nextQuestion =
              "Got it. Approximately how many guests are you expecting?";
            break;
          case "ASKING_GUEST_COUNT":
            const num = /^\d+\s*-\s*\d+$/.test(value)
              ? (() => {
                  const [min, max] = value
                    .split("-")
                    .map((n) => parseInt(n.trim(), 10));
                  return Math.round((min + max) / 2);
                })()
              : parseInt(value.trim(), 10) || 0;
            setEventDetails((prev) => ({ ...prev, guestCount: num }));
            nextState = "ASKING_LOCATION";
            nextQuestion =
              "Perfect. What city or general area is the event location?";
            break;
          case "ASKING_LOCATION":
            setEventDetails((prev) => ({ ...prev, location: value }));
            processCollectedData({ location: value });
            break;
        }
      } else {
        switch (currentFlowState) {
          case "ASKING_SERVICE_TYPE":
            setVendorRequest((prev) => ({ ...prev, service: value }));
            nextState = "ASKING_BUDGET";
            nextQuestion =
              "Understood. What's your estimated budget range for this service?";
            break;
          case "ASKING_BUDGET":
            console.log("Raw budget choice:", value);

            // Helper: strip everything except digits, commas and +/– signs
            const onlyRelevant = (s: string) =>
              s
                .replace(/,/g, "") // remove commas
                .replace(/[^\d–\-\+]/g, "") // remove non-digits except –, -, +
                .trim();

            // Extract all the numeric tokens (e.g. ["100000", "250000"])
            const tokens = onlyRelevant(value)
              .split(/[-–]/)
              .map((tok) => tok.replace("+", ""));

            let numericBudget: number;

            if (/^Under/.test(value)) {
              // "Under 100,000" → half of 100000
              const max = parseInt(tokens[0], 10);
              numericBudget = Math.round(max / 2);
            } else if (value.includes("–") || value.includes("-")) {
              // "100,000 – 250,000" or "100,000-250,000"
              const [min, max] = tokens.map((t) => parseInt(t, 10));
              numericBudget = Math.round((min + max) / 2);
            } else if (value.trim().endsWith("+")) {
              // "5,000,000+"
              numericBudget = parseInt(tokens[0], 10);
            } else {
              // Single number like "250,000"
              numericBudget = parseInt(tokens[0], 10);
            }

            console.log("Parsed numericBudget:", numericBudget);

            setVendorRequest((prev) => ({
              ...prev,
              budget: numericBudget,
            }));

            nextState = "ASKING_LOCATION";
            nextQuestion =
              "Good to know. Which city or area are you looking for vendors in?";
            break;

          case "ASKING_LOCATION":
            setVendorRequest((prev) => ({ ...prev, location: value }));
            processCollectedData({ location: value });
            break;
        }
      }

      if (nextQuestion) {
        setTimeout(() => {
          addMessage("bot", nextQuestion);
          setCurrentFlowState(nextState);
          setOptionsLocked(false);
        }, 600);
      } else {
        setOptionsLocked(false);
      }
    },
    [
      activeTab,
      currentFlowState,
      optionsLocked,
      addMessage,
      processCollectedData,
    ]
  );

  /** Handles free-text input when in PROCESSING state */
  const handleTextInputSubmit = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;
      if (currentFlowState === "PROCESSING") {
        addMessage("user", text);
        setIsLoading(true);
        try {
          if (activeTab === "vendor") {
            const req: VendorRequest = vendorRequest;
            const { data } = await axios.get(VENDOR_API_ENDPOINT, {
              params: {
                message: text,
                serviceName: req.service,
                budget: req.budget,
                location: req.location,
              },
            });
            addMessage("bot", data.reply);
          } else {
            const req: EventDetails = eventDetails;
            const { data } = await axios.post(EVENT_API_ENDPOINT, {
              message: text,
              ...req,
            });
            addMessage("bot", data.reply);
          }
        } catch {
          addMessage(
            "bot",
            "Sorry, I couldn't get a response. Please try again."
          );
        } finally {
          setIsLoading(false);
        }
      }
    },
    [
      isLoading,
      currentFlowState,
      activeTab,
      eventDetails,
      vendorRequest,
      addMessage,
    ]
  );

  /** Initializes the chat flow */
  const startFlow = useCallback(() => {
    setMessages([]);
    setEventDetails({ eventType: "", guestCount: 0, location: "" });
    setVendorRequest({ service: "", budget: 0, location: "" });
    setOptionsLocked(false);
    messageCounter.current = 0;

    let initialState: ConversationFlowState = "INITIAL";
    let initialText = "";

    if (activeTab === "event") {
      initialState = "ASKING_EVENT_TYPE";
      initialText = "Great! Let's plan your event. What type of event is it?";
    } else {
      initialState = "ASKING_SERVICE_TYPE";
      initialText = "Okay, I can help find vendors. What service do you need?";
    }

    setCurrentFlowState(initialState);
    setTimeout(() => addMessage("bot", initialText), 150);
  }, [activeTab, addMessage]);

  useEffect(() => {
    startFlow();
  }, [activeTab, startFlow]);

  return {
    activeTab,
    setActiveTab,
    currentFlowState,
    messages,
    isLoading,
    optionsLocked,
    handleOptionSelect,
    handleTextInputSubmit,
    startFlow,
  };
}
