import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "dtdc-booking-platform",
    companyName: "High-throughput booking core",
    type: "Professional",
    category: ["Backend"],
    shortDescription:
      "How a booking write is split: shared domain/core libraries, thin REST/Kafka ingress, transactional persist, then async fan-out — without coupling clients to downstream systems.",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Apache Kafka",
      "MySQL",
      "Redis",
      "AWS",
      "REST APIs",
      "Event-Driven Architecture",
    ],
    startDate: new Date("2024-10-01"),
    endDate: new Date("2026-09-01"),
    companyLogoImg: "/projects/dtdc/booking.svg",
    pagesInfoArr: [
      {
        title: "Architecture",
        description:
          "Clients never talk to Kafka or the database. Deployables only accept HTTP. Shared libraries own validation, enrichment, and persistence. Kafka is the seam between “accepted” and “published downstream”.",
        imgArr: ["/projects/dtdc/booking.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "The problem is a high-volume booking write that must stay consistent (rate, wallet, order) and still notify other systems without blocking the caller. The approach is a modular monolith: business logic is compiled once into libraries; each process is a thin Spring Boot ingress.",
        "Sync REST runs the core pipeline in-request: validate → call connectors (rate, wallet, inventory) → persist under a Spring transaction → then publish a created event. Async REST only validates enough to accept, publishes a command, and returns; a consumer runs the same core library and then emits created.",
        "Consumers use manual acknowledgement, idempotent producers, and a dead-letter topic. Events are keyed by consignment so one shipment stays ordered. Config (including topic names) is pulled from a secrets store, not baked into YAML. Reads go through a master/slave datasource; hot lookups sit in Redis.",
      ],
      bullets: [
        "Libraries: commons (errors, correlation ID), domain (DTOs, entities, events), connectors (HTTP to adjacent services), core (validate → persist).",
        "Ingress owns HTTP/Kafka wiring only — no duplicated booking rules in each service.",
        "Hybrid path: sync for immediate create/update; async command topic when the caller should not wait on downstream fan-out.",
        "After commit, a transformer consumes booking.created and fans out — ingest stays up if a downstream API is slow.",
        "Data plane: JPA + master/slave MySQL, Redis, secrets manager; documents offloaded to object storage with metadata in DB.",
      ],
    },
  },
  {
    id: "dtdc-dws-prepaid",
    companyName: "Prepaid differential pipeline",
    type: "Professional",
    category: ["Backend"],
    shortDescription:
      "How a locked batch job turns mismatch audits into a rate delta, a wallet debit, and a ledger row — with retries that cannot double-charge.",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "MySQL",
      "SQL",
      "REST APIs",
    ],
    startDate: new Date("2024-10-01"),
    endDate: new Date("2026-09-01"),
    companyLogoImg: "/projects/dtdc/dws-prepaid.svg",
    pagesInfoArr: [
      {
        title: "Architecture",
        description:
          "A run is a state machine over an audit table, not a one-shot script. Lock first. Replay failed debits from stored JSON. Then process a parallel batch of new IDENTIFIED rows. Unlock in finally.",
        imgArr: ["/projects/dtdc/dws-prepaid.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "The job does not ingest mismatches itself. Another system writes audit rows. This pipeline only selects, enriches, rates, and mutates status so two overlapping crons cannot debit twice.",
        "Stage order is fixed: lock → retry DEBIT_FAILED (retry_count < max) → process IDENTIFIED in a worker pool (one transaction per record) → unlock. Parallelism is inside a stage, never across stages.",
        "Each fresh record: enrich from a mismatch log (weight, destination, mode). No log hit → IGNORED. Fill remaining nulls from booking master. Call the rate API. differential = revised − original. Below a money threshold → skip debit. Else wallet debit; on success write a ledger row. Failures store the HTTP payload, bump retry_count, and replay next run with a new RRN and a run-scoped OAuth token.",
      ],
      bullets: [
        "Lock with TTL so cron and a manual REST kick cannot overlap.",
        "Retry path replays the stored debit body instead of rebuilding it from stale audit fields.",
        "Enrich-then-rate: ignore noise, never overwrite mismatch-log values with booking except amount refresh.",
        "Threshold gate avoids wallet chatter for tiny deltas; skip stays RATE_CALCULATED, not success.",
        "Ledger insert only after wallet SUCCESS — debit and books stay in the same success path.",
      ],
    },
  },
  {
    id: "dtdc-reconciliation",
    companyName: "Automated Cost Reconciliation Engine",
    type: "Professional",
    category: ["Backend"],
    shortDescription:
      "Pipelines that compare vendor vs. internal billing, auto-trigger rebilling APIs, cut manual auditing by ~90%, and stop revenue leaks.",
    websiteLink: "https://www.dtdc.in",
    techStack: ["Java", "Spring Boot", "MySQL", "SQL", "Jenkins", "AWS"],
    startDate: new Date("2024-10-01"),
    endDate: new Date("2026-09-01"),
    companyLogoImg: "/projects/dtdc/reconciliation.svg",
    pagesInfoArr: [
      {
        title: "Billing discrepancy detection",
        description:
          "Automated comparison of vendor and internal records with downstream rebilling.",
        imgArr: ["/projects/dtdc/reconciliation.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "I developed automated data pipelines that compare vendor billing records against internal books to catch discrepancies early.",
        "When a mismatch is found, the engine auto-triggers downstream rebilling APIs. That cut manual auditing by about 90% and reduced revenue leakage.",
      ],
      bullets: [
        "Compared vendor vs. internal billing records to detect discrepancies automatically.",
        "Auto-triggered downstream rebilling APIs to close gaps without manual follow-up.",
        "Cut manual auditing by ~90% and helped prevent revenue leaks.",
        "Paired the work with AWS Secrets Manager, S3, Jenkins CI/CD, and 85%+ JUnit/Mockito coverage.",
      ],
    },
  },
];

export const featuredProjects = Projects.slice(0, 3);
