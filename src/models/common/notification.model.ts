import { VariantType } from "notistack";

export interface Notification {
    key: string;
    message: string;
    dismissed: boolean;
    options: {
        variant: VariantType;
    };
};