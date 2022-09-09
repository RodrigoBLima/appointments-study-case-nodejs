import Appointment from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointments-repository";

interface Input {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type Output = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  async execute(input: Input): Promise<Output> {
    const { customer, startsAt, endsAt } = input;

    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates");
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
