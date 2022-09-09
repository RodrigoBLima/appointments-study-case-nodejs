import { describe, it, expect } from "vitest";
import Appointment from "../entities/appointment";
import { AppointmentRepositoryInMemory } from "../repositories/appointments-repository-in-memory";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentRepositoryInmemory = new AppointmentRepositoryInMemory();
    const createAppointment = new CreateAppointment(
      appointmentRepositoryInmemory
    );

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-12");

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should be able to create an appointment with overlapping dates", async () => {
    const appointmentRepositoryInmemory = new AppointmentRepositoryInMemory();
    const createAppointment = new CreateAppointment(
      appointmentRepositoryInmemory
    );

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-12"),
        endsAt: getFutureDate("2022-08-17"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-05"),
        endsAt: getFutureDate("2022-08-13"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-05"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-12"),
        endsAt: getFutureDate("2022-08-13"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
