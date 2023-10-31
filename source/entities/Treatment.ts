import { IExamsAppointment, IMedicineAppointment, INutritionsAppointment, ITests_FastsAppointment, ITreatment, IVaccineAppointment, IllnessesAppointment } from "~/store/slices/appointment-vet/types";

class Treatment implements ITreatment {
    medicines: IMedicineAppointment[];
    vaccines: IVaccineAppointment[];
    exams: IExamsAppointment[];
    nutritions: INutritionsAppointment[];
    illnesses: IllnessesAppointment[];
    tests_fasts: ITests_FastsAppointment[];

    private constructor(
        public readonly apply_medicine = false,
        public readonly apply_vaccine = false,
        public readonly apply_exam = false,
        public readonly apply_nutrition = false,
        public readonly apply_disease = false,
        public readonly apply_fast_test = false,
    ) {
        this.medicines = []
        this.vaccines = []
        this.exams = []
        this.nutritions = []
        this.illnesses = []
        this.tests_fasts = []
    }


    private defineMedicines(
        medicines: IMedicineAppointment[] = []
    ): this {
        if (!this.apply_medicine) return this

        this.medicines = medicines;
        return this;
    }

    private defineVaccines(
        vaccines: IVaccineAppointment[] = []
    ): this {
        if (!this.apply_vaccine) return this

        this.vaccines = vaccines;
        return this;
    }

    private defineExams(
        exams: IExamsAppointment[] = []
    ): this {
        if (!this.apply_exam) return this

        this.exams = exams;
        return this;
    }

    private defineNutritions(
        nutritions: INutritionsAppointment[] = []
    ): this {
        if (!this.apply_nutrition) return this

        this.nutritions = nutritions;
        return this;
    }

    private defineIllnesses(
        illnesses: IllnessesAppointment[] = []
    ): this {
        if (!this.apply_disease) return this

        this.illnesses = illnesses;
        return this;
    }

    private defineTestsFasts(
        tests_fasts: ITests_FastsAppointment[] = []
    ): this {
        if (!this.apply_fast_test) return this

        this.tests_fasts = tests_fasts;
        return this;
    }

    static build(treatment: ITreatment): Treatment {
        return new Treatment(
            treatment.apply_medicine,
            treatment.apply_vaccine,
            treatment.apply_exam,
            treatment.apply_nutrition,
            treatment.apply_disease,
            treatment.apply_fast_test,
        )
            .defineMedicines(treatment.medicines)
            .defineVaccines(treatment.vaccines)
            .defineExams(treatment.exams)
            .defineNutritions(treatment.nutritions)
            .defineIllnesses(treatment.illnesses)
            .defineTestsFasts(treatment.tests_fasts)
    }

}

export default Treatment