import React from "react";
import { Controller } from "react-hook-form";
import PhoneNumberInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const PhoneInput = ({ control, className = "phone-input" }) => {
  // ".phone-input" is for default styling from react-phone-number-input/style.css

  return (
    <div>
      <Controller
        name="phone"
        control={control}
        rules={{ required: "Phone number is required" }}
        render={({ field, fieldState }) => (
          <div className="max-w-sm mx-auto">
            <PhoneNumberInput
              {...field}
              international // to enforce international format (of including +... code prior to number)
              defaultCountry="UG"
              placeholder="Enter phone number of any country"
              className={className}
            />
            {fieldState.error?.phone && (
              <p>{fieldState.error?.phone.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};
