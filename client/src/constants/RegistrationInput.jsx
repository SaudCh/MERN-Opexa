const inputArray = [
  { name: "Name", placeholder: "Please type your name here" },
  { name: "Email", placeholder: "Name@domain.com" },
  { name: "Business Name", placeholder: "Write Business Name" },
  {
    name: "Choose",
    options: ["Option 1", "Option 2", "Option 3"],
    placeholder: "Select an option",
  },
  { name: "Suspended / Disabled Date", placeholder: "Date" },
  {
    name: "Did you request reinstatement?",
    type: "checkbox",
    options: ["Yes", "No"],
  },
  {
    name: "More Details",
    type: "textarea",
    placeholder: "Please add more details, If you want....",
  },
];

export default inputArray;
