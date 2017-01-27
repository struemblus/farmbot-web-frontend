export interface ImageState {
    all: Image[];
}

export interface Image {
    id: number;
    device_id: number;
    attachment_processed_at: Date | undefined;
    updated_at: Date;
    created_at: Date;
    attachment_url: string;
    meta: {
        x: number | undefined;
        y: number | undefined;
        z: number | undefined;
    };
}

export interface DetectorState {
    isEditing?: boolean;
    HUELow?: number;
    HUEHigh?: number;
    saturationLow?: number;
    saturationHigh?: number;
    valueLow?: number;
    valueHigh?: number;
    blur?: number;
    morph?: number;
    iterations?: number;
    time?: string;
    location?: string;
}

