import { areIntervalsOverlapping } from "date-fns";
import Appointment from "../entities/appointment";
import { AppointmentRepository } from "./appointments-repository";

export class AppointmentRepositoryInMemory implements AppointmentRepository {
  public items: Appointment[];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt,
    endsAt
  ): Promise<Appointment | null> {
    const overllapingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        {
          start: startsAt,
          end: endsAt,
        },
        {
          start: appointment.startsAt,
          end: appointment.endsAt,
        },
        {
          inclusive: true
        }
      );
    });

    if (!overllapingAppointment) return null

    return overllapingAppointment;
  }
}
