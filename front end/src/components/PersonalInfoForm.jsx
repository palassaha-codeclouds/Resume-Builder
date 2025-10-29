import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const PersonalInfoForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  const validateField = (key, value) => {
    switch (key) {
      case "full_name":
        if (!value.trim()) {
          toast.error("Full Name is required");
          return false;
        }
        break;

      case "email":
        if (!value.trim()) {
          toast.error("Email Address is required");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          toast.error("Enter a valid email address");
          return false;
        }
        break;

      case "phone":
        if (value && !/^\d{10}$/.test(value)) {
          toast.error("Phone number must be 10 digits");
          return false;
        }
        break;

      case "linkedin":
        if (
          value &&
          !/^https?:\/\/(www\.)?([a-z]{2,3}\.)?linkedin\.com\/.*$/i.test(value)
        ) {
          toast.error("Enter a valid LinkedIn URL");
          return false;
        }
        break;

      case "website":
        if (value && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value)) {
          toast.error("Enter a valid website URL");
          return false;
        }
        break;

      default:
        break;
    }
    return true;
  };

  const validatePersonalInfo = () => {
    const { full_name, email, phone, linkedin, website } = data || {};

    if (!full_name?.trim()) {
      toast.error("Full Name is required");
      return false;
    }

    if (!email?.trim()) {
      toast.error("Email Address is required");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }

    if (
      linkedin &&
      !/^https?:\/\/(www\.)?([a-z]{2,3}\.)?linkedin\.com\/.*$/i.test(linkedin)
    ) {
      toast.error("Enter a valid LinkedIn URL");
      return false;
    }

    if (website && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(website)) {
      toast.error("Enter a valid website URL");
      return false;
    }

    return true;
  };

  PersonalInfoForm.validate = validatePersonalInfo;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <p className="text-sm text-gray-600">Get started with Personal Information</p>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              onBlur={(e) => validateField(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
