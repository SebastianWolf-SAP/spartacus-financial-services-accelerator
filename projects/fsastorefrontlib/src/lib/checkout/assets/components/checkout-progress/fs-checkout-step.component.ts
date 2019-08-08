import { CheckoutStep } from "@spartacus/storefront";

export interface FSCheckoutStepStatus {
    disabled;
    completed;
    active;
}

export interface FSCheckoutStep extends CheckoutStep {
    status: FSCheckoutStepStatus;
    icon: string;
}