export type StepProps = {
    toggleTab: (tab: any) => void;
    activeTab: number;
}

export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
}