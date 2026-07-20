import { OnboardingItemType } from "../types/onboarding.types";

export const onboardingData: OnboardingItemType[] = [
  {
    id: 1,
    title: "Discover Amazing Food",
    description:
      "Explore nearby restaurants and order your favorite meals with just a few taps.",
    image: require("@/assets/images/onboarding/chief.svg"),
  },

  {
    id: 2,
    title: "Lightning Fast Delivery",
    description:
      "Track your order live and get your food delivered fresh and on time.",
    image: require("@/assets/images/onboarding/delivery-guy.svg"),
  },

  {
    id: 3,
    title: "Exclusive Offers",
    description: "Unlock daily deals, discounts and rewards on every order.",
    image: require("@/assets/images/onboarding/brithday-girl.svg"),
  },

  {
    id: 4,
    title: "Ready to Crave?",
    description:
      "Join CraveNow and enjoy delicious food delivered to your doorstep.",
    image: require("@/assets/images/onboarding/burger.svg"),
  },
];
