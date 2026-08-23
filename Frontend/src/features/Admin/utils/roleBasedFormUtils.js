/**
 * Role Based Form Utility Functions
 * @file roleBasedFormUtils.js
 */

// Available roles
export const ROLE_OPTIONS = [
  {
    value: "customer",
    label: "Customers",
    icon: "person",
  },
  {
    value: "technician",
    label: "Technicians",
    icon: "engineering",
  },
];

// Get role information
export const getRoleConfig = (role) => {
  return (
    ROLE_OPTIONS.find((item) => item.value === role) || ROLE_OPTIONS[0]
  );
};

// Get role display name
export const getRoleLabel = (role) => {
  return role === "customer" ? "Customers" : "Technicians";
};

// Get title placeholder
export const getTitlePlaceholder = (role) => {
  return `Title for ${role}s…`;
};

// Get message placeholder
export const getMessagePlaceholder = (role) => {
  return `Write a message for all ${role}s…`;
};

// Get send button label
export const getSendButtonLabel = (role) => {
  return `Send to All ${getRoleLabel(role)}`;
};

// Get role button classes
export const getRoleButtonClasses = (role, selectedRole) => {
  const isSelected = role === selectedRole;

  if (!isSelected) {
    return "bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300";
  }

  if (role === "customer") {
    return "bg-[#004ac6]/10 text-[#004ac6] border-[#004ac6]/30 shadow-sm";
  }

  return "bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm";
};