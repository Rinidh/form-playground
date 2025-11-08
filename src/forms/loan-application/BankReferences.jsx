import React from "react";
import { PhoneInput } from "../../components/IntPhoneInput";

export const BankReferences = ({ fields, register, control, append }) => {
  return (
    <div className="col-md-12">
      {fields.map((field, index) => (
        <BankReference
          key={field.id}
          index={index}
          control={control}
          register={register}
        />
      ))}
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={() =>
          append({
            institution: "",
            savingsAccount: "",
            address: "",
            phone: "",
          })
        }
      >
        Add Referee Bank
      </button>
    </div>
  );
};

const BankReference = ({ index, register, control, errors }) => {
  const errorFields = errors?.bankReferences?.[index];

  return (
    <div className="row">
      <div className="col-md-3">
        <label>
          Institution Name
          <input
            {...register(`bankReferences.${index}.institution`)}
            className={`form-control ${
              errorFields?.institution ? "is-invalid" : ""
            }`}
          />
        </label>
        <div className="invalid-feedback">
          {errorFields?.institution?.message}
        </div>
      </div>
      <div className="col-md-3">
        <label>
          Savings Account Name
          <input
            {...register(`bankReferences.${index}.savingsAccount`)}
            className={`form-control ${
              errorFields?.savingsAccount ? "is-invalid" : ""
            }`}
          />
        </label>
        <div className="invalid-feedback">
          {errorFields?.savingsAccount?.message}
        </div>
      </div>
      <div className="col-md-3">
        <label>
          Address
          <input
            {...register(`bankReferences.${index}.address`)}
            className={`form-control ${
              errorFields?.address ? "is-invalid" : ""
            }`}
          />
        </label>
        <div className="invalid-feedback">{errorFields?.address?.message}</div>
      </div>
      <div className="col-md-3">
        <label>
          Contact
          <PhoneInput
            control={control}
            className={`form-control ${errorFields?.phone ? "is-invalid" : ""}`}
          />
        </label>
        <div className="invalid-feedback">
          {errorFields?.institution?.phone}
        </div>
      </div>
    </div>
  );
};
