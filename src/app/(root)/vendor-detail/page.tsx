"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ShowModalError from "@/components/modal/showErrorModal";
import PaymentGateways from "@/components/modal/PaymentGetways";
import { useUser } from "@/context/userContext";
import { VendorForm } from "@/features/profile/add_vendor_info";
import { plansService } from "@/services/plan.service";
import { subscriptionService } from "@/services/subscription.service";
import { Plan } from "@/types/plan/plan";
import { ProfileData } from "@/types/profile";
import { SubscriptionCreateData } from "@/types/subscription";
import { VendorData } from "@/types/vendor";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  const planId = searchParams.get("planId");
  const priceId = searchParams.get("priceId");

  const [plan, setPlan] = useState<Plan | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    if (!planId || !priceId) {
      setErrorMessage("Invalid plan or price ID");
      setModalOpen(true);
      setIsLoading(false);
      return;
    }

    const fetchPlan = async () => {
      try {
        setIsLoading(true);
        const fetchedPlan = await plansService.getPlanById(Number(planId));

        if (!fetchedPlan?.data?.[0]) {
          throw new Error("Plan not found");
        }

        setPlan(fetchedPlan.data[0]);
      } catch (error) {
        console.error("Error fetching plan:", error);
        setErrorMessage("Failed to fetch plan details. Please try again.");
        setModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlan();
  }, [planId, priceId]);

  const closeModal = () => {
    setModalOpen(false);
    if (errorMessage.includes("Invalid plan")) {
      router.push("/plans");
    }
  };

  const handleContinuePayment = async () => {
    try {
      const response = await subscriptionService.initChapaPayment(paymentData);
      console.log("response is ", response);

      if (response.data && response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        setErrorMessage("Failed to initialize payment. Please try again.");
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      setErrorMessage("Payment initialization failed. Please try again.");
      setModalOpen(true);
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
  };

  const handleSuccess = async (data: {
    profileData: ProfileData;
    vendorData: VendorData;
  }) => {
    if (!planId || !priceId || !plan?.Prices?.[0]) {
      setErrorMessage("Plan details not fetched correctly. Please try again.");
      setModalOpen(true);
      return;
    }

    try {
      const newSubscriptionData: SubscriptionCreateData = {
        planId: parseInt(planId),
        priceId: parseInt(priceId),
        profileData: data.profileData,
        startDate: new Date().toISOString(),
        vendorData: data.vendorData,
      };

      const response = await subscriptionService.createSubscription(
        newSubscriptionData
      );

      console.log("response is");
      console.log(response.subscription.id);

      if (response && response.subscription) {
        const newPaymentData = {
          subscriptionId: response.subscription.id,
          phoneNumber: data.profileData.phoneNumber,
          email: user?.email,
          amount: plan.Prices[0].amount,
          currency: plan.Prices[0].currency,
          first_name: data.profileData.firstName,
          last_name: data.profileData.lastName,
          tx_ref: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: "subscription",
          title: `Subscribe to ${plan.name}`,
        };

        setPaymentData(newPaymentData);
        setShowPaymentModal(true);
      } else {
        setErrorMessage("Failed to create subscription. Please try again.");
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      setErrorMessage("Subscription creation failed. Please try again.");
      setModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto lg:px-4 py-8">
      <VendorForm onSuccess={handleSuccess} />
      {/* Error Modal */}
      <ShowModalError
        message={errorMessage}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        type="error"
        title="Error Occurred"
      />

      {/* Payment Modal */}
      {showPaymentModal && paymentData && (
        <PaymentGateways
          {...paymentData}
          isModalOpen={showPaymentModal}
          closeModal={handlePaymentCancel}
          onSelectPayment={handleContinuePayment}
        />
      )}
    </div>
  );
}
