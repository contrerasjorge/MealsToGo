export const html_attributions: any[];
export const next_page_token: string;
export const results: ({
    business_status: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            };
            southwest: {
                lat: number;
                lng: number;
            };
        };
    };
    icon: string;
    name: string;
    opening_hours: {
        open_now: boolean;
    };
    photos: {
        height: number;
        html_attributions: any[];
        photo_reference: string;
        width: number;
    }[];
    place_id: string;
    rating: number;
    reference: string;
    user_ratings_total: number;
    vicinity: string;
    plus_code?: undefined;
    scope?: undefined;
    types?: undefined;
    price_level?: undefined;
} | {
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            };
            southwest: {
                lat: number;
                lng: number;
            };
        };
    };
    icon: string;
    name: string;
    photos: {
        height: number;
        html_attributions: any[];
        photo_reference: string;
        width: number;
    }[];
    place_id: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    };
    reference: string;
    scope: string;
    types: string[];
    vicinity: string;
    business_status?: undefined;
    opening_hours?: undefined;
    rating?: undefined;
    user_ratings_total?: undefined;
    price_level?: undefined;
} | {
    business_status: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            };
            southwest: {
                lat: number;
                lng: number;
            };
        };
    };
    icon: string;
    name: string;
    opening_hours: {
        open_now: boolean;
    };
    photos: {
        height: number;
        html_attributions: string[];
        photo_reference: string;
        width: number;
    }[];
    place_id: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    };
    rating: number;
    reference: string;
    scope: string;
    types: string[];
    user_ratings_total: number;
    vicinity: string;
    price_level?: undefined;
} | {
    business_status: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            };
            southwest: {
                lat: number;
                lng: number;
            };
        };
    };
    icon: string;
    name: string;
    opening_hours: {
        open_now: boolean;
    };
    photos: {
        height: number;
        html_attributions: any[];
        photo_reference: string;
        width: number;
    }[];
    place_id: string;
    price_level: number;
    rating: number;
    reference: string;
    user_ratings_total: number;
    vicinity: string;
    plus_code?: undefined;
    scope?: undefined;
    types?: undefined;
} | {
    business_status: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            };
            southwest: {
                lat: number;
                lng: number;
            };
        };
    };
    icon: string;
    name: string;
    opening_hours: {
        open_now: boolean;
    };
    photos: {
        height: number;
        html_attributions: string[];
        photo_reference: string;
        width: number;
    }[];
    place_id: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    };
    price_level: number;
    rating: number;
    reference: string;
    scope: string;
    types: string[];
    user_ratings_total: number;
    vicinity: string;
})[];
export const status: string;
