export const STATELIST = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY"
];

export const eventOptions = [
  { name: "Materials", icon: "fa-book", route: "/events/material" },
  { name: "Agenda", icon: "fa-calendar-minus", route: "/agenda" },
  { name: "My Progress", icon: "fa-flag", route: "/events/progress" },
  { name: "Feedback", icon: "fa-comment-alt", route: "/events/feedback" },
  { name: "Event Wall", icon: "fa-share-alt", route: "/events/wall" },
  { name: "Attendees", icon: "fa-users", route: "/events/attendeelist" }
];

export const TEXT = {
  staticPhotolink: "https://static.usoncevents.com/blank-profile.png"
};

export const USERROLES = {
  ADMIN: "Admin"
}

export const TEXT_VALIDATIONS = {
  REQUIRED: val => !!val || 'required'
};
