export const PATIENTS = [
  { id: "A4-72", name: "Maria S., 57", status: "Opted In", lastContact: "Today, 14:32", attempts: "2/3 voice + 1 SMS", channel: "Both", sentiment: "Positive", summary: "Expressed concern about time; agent addressed it, opted in to FIT kit." },
  { id: "B2-15", name: "Luc V., 58", status: "SMS Sent", lastContact: "Today, 13:55", attempts: "0/3 voice + 1 SMS", channel: "SMS", sentiment: "Neutral", summary: "SMS opened, no response yet." },
  { id: "C7-91", name: "Anne-Marie D., 71", status: "Opted In", lastContact: "Today, 12:08", attempts: "1/3 voice + 0 SMS", channel: "Voice", sentiment: "Positive", summary: "Booked appointment directly on first call." },
  { id: "D3-44", name: "Pieter H., 55", status: "Pending", lastContact: "Yesterday, 17:20", attempts: "1/3 voice + 1 SMS", channel: "Both", sentiment: "Neutral", summary: "No answer on call; SMS sent, no action." },
  { id: "E1-08", name: "Rosa M., 68", status: "Callback", lastContact: "Today, 11:45", attempts: "2/3 voice + 0 SMS", channel: "Voice", sentiment: "Positive", summary: "Requested callback for Thursday 10:00." },
  { id: "F5-33", name: "António F., 62", status: "Opted Out", lastContact: "Yesterday, 09:12", attempts: "3/3 voice + 1 SMS", channel: "Both", sentiment: "Negative", summary: "Explicitly declined; cited previous bad experience." },
  { id: "G8-19", name: "Carla N., 54", status: "Connected", lastContact: "Today, 10:30", attempts: "1/3 voice + 0 SMS", channel: "Voice", sentiment: "Neutral", summary: "Agent currently speaking with patient." },
  { id: "H2-77", name: "Manuel P., 70", status: "Dialling", lastContact: "Today, 10:28", attempts: "0/3 voice + 0 SMS", channel: "Voice", sentiment: "Neutral", summary: "First call attempt in progress." },
  { id: "I9-55", name: "Beatriz A., 66", status: "Opted In", lastContact: "Yesterday, 16:50", attempts: "1/3 voice + 1 SMS", channel: "Both", sentiment: "Positive", summary: "Agreed to screening; kit dispatched." },
  { id: "J4-82", name: "Rui C., 51", status: "Unreachable", lastContact: "3 days ago", attempts: "3/3 voice + 2 SMS", channel: "Both", sentiment: "Neutral", summary: "No response on all attempts." },
  { id: "K6-14", name: "Fátima L., 73", status: "Opted In", lastContact: "Yesterday, 14:05", attempts: "2/3 voice + 0 SMS", channel: "Voice", sentiment: "Positive", summary: "Very engaged; completed appointment questionnaire." },
  { id: "L1-39", name: "Jorge M., 60", status: "SMS Sent", lastContact: "Today, 09:00", attempts: "0/3 voice + 1 SMS", channel: "SMS", sentiment: "Neutral", summary: "Awaiting response to initial SMS." },
  { id: "M7-63", name: "Teresa S., 58", status: "Callback", lastContact: "Yesterday, 11:30", attempts: "1/3 voice + 1 SMS", channel: "Both", sentiment: "Positive", summary: "Requested information sent to GP first." },
  { id: "N3-28", name: "Paulo R., 64", status: "Opted Out", lastContact: "2 days ago", attempts: "2/3 voice + 1 SMS", channel: "Both", sentiment: "Negative", summary: "Said already did screening elsewhere." },
  { id: "O5-91", name: "Inês B., 56", status: "Pending", lastContact: "4 days ago", attempts: "0/3 voice + 0 SMS", channel: "—", sentiment: "Neutral", summary: "Not yet contacted." },
  { id: "P8-47", name: "Vítor G., 69", status: "Opted In", lastContact: "Yesterday, 13:15", attempts: "1/3 voice + 0 SMS", channel: "Voice", sentiment: "Positive", summary: "Strong family history; very motivated to screen." },
  { id: "Q2-55", name: "Ana M., 72", status: "Connected", lastContact: "Today, 10:25", attempts: "2/3 voice + 1 SMS", channel: "Both", sentiment: "Neutral", summary: "Currently reviewing options with agent." },
  { id: "R4-11", name: "Carlos F., 53", status: "SMS Sent", lastContact: "Today, 08:45", attempts: "0/3 voice + 1 SMS", channel: "SMS", sentiment: "Neutral", summary: "SMS delivered, link not clicked yet." },
  { id: "S6-73", name: "Lurdes P., 61", status: "Opted In", lastContact: "Yesterday, 15:45", attempts: "1/3 voice + 0 SMS", channel: "Voice", sentiment: "Positive", summary: "Excited to participate; shared with her sister." },
  { id: "T9-36", name: "Miguel A., 67", status: "Unreachable", lastContact: "5 days ago", attempts: "3/3 voice + 2 SMS", channel: "Both", sentiment: "Neutral", summary: "Number may be incorrect; flagged for review." },
];

export const CAMPAIGNS = [
  {
    id: "crc-azores",
    name: "CRC Screening — Azores",
    topic: "Colorectal Cancer Screening",
    language: "Portuguese (PT-PT)",
    status: "Active",
    voiceAttempts: 3,
    smsAttempts: 1,
    smsFallback: 3,
    voiceEnabled: true,
    smsEnabled: true
  },
  {
    id: "flu-pilot",
    name: "Flu Vaccination — Pilot",
    topic: "Flu Vaccination",
    language: "Portuguese (PT-PT)",
    status: "Draft",
    voiceAttempts: 2,
    smsAttempts: 2,
    smsFallback: 2,
    voiceEnabled: true,
    smsEnabled: true
  },
  {
    id: "breast-cancer",
    name: "Breast Cancer Screening",
    topic: "Breast Cancer Screening",
    language: "Portuguese (PT-PT)",
    status: "Scheduled",
    voiceAttempts: 3,
    smsAttempts: 1,
    smsFallback: 3,
    voiceEnabled: true,
    smsEnabled: true
  }
];
