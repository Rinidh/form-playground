// CheckoutForm.jsx
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import pureGlowCream from "../../assets/pure-glow-cream.jpeg";
import formSchema from "./schema";
import { postData } from "./api";
import { PhoneInput } from "../../components/IntPhoneInput";

// Components for each step
const Step1 = () => (
  <fieldset className="text-center">
    <legend className="visually-hidden">Product Information</legend>

    <img
      src={pureGlowCream}
      className="img-thumbnail"
      style={{ height: "50vh" }}
      alt="Pure Glow Cream"
    />

    <h4>Pure Glow Cream</h4>
    <p className="text-muted">
      A skin rejuvenating cream for radiant, glowing skin.
    </p>
    <h5>Price: UGX 115,000</h5>
  </fieldset>
);

const Step2 = ({ register, errors, control }) => (
  <fieldset>
    <legend>Personal Information</legend>

    {/* Name */}
    <div className="mb-3">
      <label className="form-label" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        {...register("name")}
        className="form-control"
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? "name-error" : undefined}
      />
      {errors.name && (
        <small id="name-error" className="text-danger">
          {errors.name.message}
        </small>
      )}
    </div>

    {/* Email */}
    <div className="mb-3">
      <label className="form-label" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        inputMode="email"
        {...register("email")}
        className="form-control"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {errors.email && (
        <small id="email-error" className="text-danger">
          {errors.email.message}
        </small>
      )}
    </div>

    {/* Phone */}
    <div className="mb-3">
      <PhoneInput name="phone" control={control} errors={errors} />
    </div>
  </fieldset>
);

const Step3 = ({ register, errors }) => (
  <fieldset>
    <legend>Shipping Information</legend>

    {/* Address */}
    <div className="mb-3">
      <label className="form-label" htmlFor="address">
        Address
      </label>
      <input
        id="address"
        {...register("address")}
        className="form-control"
        aria-invalid={!!errors.address}
        aria-describedby={errors.address ? "address-error" : undefined}
      />
      {errors.address && (
        <small id="address-error" className="text-danger">
          {errors.address.message}
        </small>
      )}
    </div>

    <div className="row">
      {/* City */}
      <div className="col-md-6 mb-3">
        <label className="form-label" htmlFor="city">
          City
        </label>
        <input
          id="city"
          {...register("city")}
          className="form-control"
          aria-invalid={!!errors.city}
          aria-describedby={errors.city ? "city-error" : undefined}
        />
        {errors.city && (
          <small id="city-error" className="text-danger">
            {errors.city.message}
          </small>
        )}
      </div>

      {/* ZIP */}
      <div className="col-md-3 mb-3">
        <label className="form-label" htmlFor="zip">
          ZIP
        </label>
        <input
          id="zip"
          inputMode="numeric"
          {...register("zip")}
          className="form-control"
          aria-invalid={!!errors.zip}
          aria-describedby={errors.zip ? "zip-error" : undefined}
        />
        {errors.zip && (
          <small id="zip-error" className="text-danger">
            {errors.zip.message}
          </small>
        )}
      </div>

      {/* State */}
      <div className="col-md-3 mb-3">
        <label className="form-label" htmlFor="state">
          State
        </label>
        <input
          id="state"
          {...register("state")}
          className="form-control"
          aria-invalid={!!errors.state}
          aria-describedby={errors.state ? "state-error" : undefined}
        />
        {errors.state && (
          <small id="state-error" className="text-danger">
            {errors.state.message}
          </small>
        )}
      </div>
    </div>
  </fieldset>
);

const Step4 = ({ register, watch, errors, setValue, trigger }) => {
  const fields = watch(["method", "sameBillingShipping"]);

  return (
    <fieldset>
      <legend>Payment Information</legend>

      {/* Payment Method */}
      <div className="mb-3">
        <span id="method-label" className="form-label">
          Payment Method
        </span>

        <div role="radiogroup" aria-labelledby="method-label">
          <div className="form-check">
            <input
              {...register("method")}
              type="radio"
              value="cod"
              className="form-check-input"
              id="cod"
              aria-invalid={!!errors.method}
              aria-describedby={errors.method ? "method-error" : undefined}
            />
            <label className="form-check-label" htmlFor="cod">
              Cash on Delivery
            </label>
          </div>

          <div className="form-check">
            <input
              {...register("method")}
              type="radio"
              value="card"
              className="form-check-input"
              id="card"
              aria-invalid={!!errors.method}
              aria-describedby={errors.method ? "method-error" : undefined}
            />
            <label className="form-check-label" htmlFor="card">
              Pay with Card
            </label>
          </div>
        </div>

        {errors.method && (
          <small id="method-error" className="text-danger">
            {errors.method.message}
          </small>
        )}
      </div>

      {/* Card fields if payment by card you select */}
      {fields[0] === "card" && (
        <fieldset className="border p-3 rounded bg-light">
          <legend>Card Details</legend>

          {/* Card Number */}
          <div className="mb-3">
            <label className="form-label" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              id="cardNumber"
              inputMode="numeric"
              {...register("cardNumber", {
                onChange: (e) => {
                  const digits = e.target.value;
                  let noSpaceDigits = digits.replace(/\s+/g, "");
                  const areAllDigits = /^\d+$/.test(noSpaceDigits);

                  if (!areAllDigits || noSpaceDigits.length > 16) {
                    noSpaceDigits = noSpaceDigits.substring(
                      0,
                      noSpaceDigits.length - 1 // eliminate the last entered character to simulate that user's input was rejected
                    );
                  }

                  setValue("cardNumber", groupToFour(noSpaceDigits));

                  function groupToFour(digits) {
                    return digits.match(/.{1,4}/g)?.join(" ") || digits;
                  }
                },
              })}
              className="form-control"
              placeholder="1234 1234 1234 1234"
              aria-invalid={!!errors.cardNumber}
              aria-describedby={
                errors.cardNumber ? "cardNumber-error" : undefined
              }
            />
            {errors.cardNumber && (
              <small id="cardNumber-error" className="text-danger">
                {errors.cardNumber.message}
              </small>
            )}
          </div>

          {/* Expiry + CVC */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="expiry">
                Expiry Date
              </label>
              <input
                id="expiry"
                {...register("expiry", {
                  onChange: (e) => {
                    let values = e.target.value.replace(/\D/g, "");

                    if (values.length > 2) {
                      values = `${values.slice(0, 2)} / ${values.slice(2, 4)}`;
                    }

                    setValue("expiry", values);
                  },
                  onBlur: () => trigger("expiry"),
                })}
                className="form-control"
                placeholder="MM / YY"
                aria-invalid={!!errors.expiry}
                aria-describedby={errors.expiry ? "expiry-error" : undefined}
              />
              {errors.expiry && (
                <small id="expiry-error" className="text-danger">
                  {errors.expiry.message}
                </small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="cvc">
                CVC
              </label>
              <input
                id="cvc"
                inputMode="numeric"
                {...register("cvc")}
                className="form-control"
                aria-invalid={!!errors.cvc}
                aria-describedby={errors.cvc ? "cvc-error" : undefined}
              />
              {errors.cvc && (
                <small id="cvc-error" className="text-danger">
                  {errors.cvc.message}
                </small>
              )}
            </div>
          </div>

          {/* Billing address checkbox */}
          <div className="mb-3">
            <input
              id="sameBillingShippingAddresses"
              type="checkbox"
              defaultChecked
              {...register("sameBillingShipping", { valueAsBoolean: true })}
            />
            <label htmlFor="sameBillingShippingAddresses" className="ms-2">
              Billing address is same as shipping
            </label>

            {/* Show billing fields */}
            {fields[1] === false && (
              <div className="mt-3">
                {/* Billing address */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="billingAddress">
                    Billing Address
                  </label>
                  <input
                    id="billingAddress"
                    {...register("billingAddress")}
                    className="form-control"
                    aria-invalid={!!errors.billingAddress}
                    aria-describedby={
                      errors.billingAddress ? "billingAddress-error" : undefined
                    }
                  />
                  {errors.billingAddress && (
                    <small id="billingAddress-error" className="text-danger">
                      {errors.billingAddress.message}
                    </small>
                  )}
                </div>

                {/* Billing state */}
                <div className="col-md-3 mb-3">
                  <label className="form-label" htmlFor="billingState">
                    Billing State
                  </label>
                  <input
                    id="billingState"
                    {...register("billingState")}
                    className="form-control"
                    aria-invalid={!!errors.billingState}
                    aria-describedby={
                      errors.billingState ? "billingState-error" : undefined
                    }
                  />
                  {errors.billingState && (
                    <small id="billingState-error" className="text-danger">
                      {errors.billingState.message}
                    </small>
                  )}
                </div>
              </div>
            )}
          </div>
        </fieldset>
      )}
    </fieldset>
  );
};

const Step5 = ({ data }) => (
  <fieldset>
    <legend>Review Your Order</legend>

    <ul className="list-group">
      <li className="list-group-item">
        Product: Pure Glow Cream - UGX 115,000
      </li>
      <li className="list-group-item">Name: {data.name}</li>
      <li className="list-group-item">Email: {data.email}</li>
      <li className="list-group-item">Phone: {data.phone}</li>
      <li className="list-group-item">
        Address: {data.address}, {data.city}, {data.state} - {data.zip}
      </li>
      <li className="list-group-item">
        Payment: {data.method === "cod" ? "Cash on Delivery" : "Card Payment"}
      </li>
      {data.method === "card" && (
        <>
          <li className="list-group-item">Card Number: {data.cardNumber}</li>
          <li className="list-group-item">Expiry: {data.expiry}</li>
          <li className="list-group-item">CVC: {data.cvc}</li>
        </>
      )}
    </ul>
  </fieldset>
);

// ---------------- Main Component ----------------
export function CheckOutForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
    getValues,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit", // validate in end (default in RHF). However, validations are manually triggered per step in next()
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
      state: "",
      method: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      sameBillingShipping: true,
      billingAddress: "",
      billingState: "",
    },
  });
  console.log("errors", errors);
  // console.log("watch", watch());

  const [step, setStep] = useState(1);

  const onSubmit = async (data) => postData(data);
  const onError = (errors) => console.error("Submit errors:", errors);

  const next = async () => {
    let isValid = false;

    switch (step) {
      case 1:
        setStep((s) => s + 1);
        break;

      case 2:
        isValid = await trigger(["name", "email", "phone"]);
        break;

      case 3:
        isValid = await trigger(["address", "city", "zip", "state"]);
        break;

      case 4:
        isValid = await trigger([
          "method",
          "cardNumber",
          "expiry",
          "cvc",
          "sameBillingShipping",
          "billingAddress",
          "billingState",
        ]);
        break;
    }

    if (isValid) setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="card p-4 shadow-sm">
          <h3 className="mb-3 text-center" aria-live="polite">
            Checkout - Step {step}/5
          </h3>

          {step === 1 && <Step1 />}
          {step === 2 && (
            <Step2 register={register} errors={errors} control={control} />
          )}
          {step === 3 && <Step3 register={register} errors={errors} />}
          {step === 4 && (
            <Step4
              register={register}
              watch={watch}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
            />
          )}
          {step === 5 && <Step5 data={getValues()} />}

          <div className="d-flex justify-content-end mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                className="btn btn-secondary me-3"
              >
                Back
              </button>
            )}

            {step < 5 ? (
              <button type="button" onClick={next} className="btn btn-primary">
                Next
              </button>
            ) : (
              <input
                type="submit"
                className="btn btn-success"
                value="Submit Order"
                disabled={!isValid}
                aria-disabled={!isValid}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
