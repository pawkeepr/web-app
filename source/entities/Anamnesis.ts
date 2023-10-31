import {
    IAnamnesis,
    IAnamnesisAppointment,
    IQuestionAnamnesis,
} from "~/store/slices/appointment-vet/types";


class Anamnesis implements IAnamnesis {
    anamnesis: IAnamnesisAppointment;

    private constructor(
        public readonly digestive_system = false,
        public readonly respiratory_system = false,
        public readonly urinary_system = false,
        public readonly nervous_system = false,
        public readonly locomotor_system = false,
    ) {
        this.anamnesis = {
            digestive_system: [],
            respiratory_system: [],
            urinary_system: [],
            nervous_system: [],
            locomotor_system: [],
        }
    }


    private defineDigestiveSystem(
        digestive_system: IQuestionAnamnesis[] = []
    ): this {
        if (!this.digestive_system) return this

        this.anamnesis.digestive_system = digestive_system;
        return this;
    }

    private defineRespiratorySystem(
        respiratory_system: IQuestionAnamnesis[] = []
    ): this {
        if (!this.respiratory_system) return this

        this.anamnesis.respiratory_system = respiratory_system;
        return this;
    }

    private defineUrinarySystem(
        urinary_system: IQuestionAnamnesis[] = []
    ): this {
        if (!this.urinary_system) return this

        this.anamnesis.urinary_system = urinary_system;
        return this;
    }

    private defineNervousSystem(
        nervous_system: IQuestionAnamnesis[] = []
    ): this {
        if (!this.nervous_system) return this

        this.anamnesis.nervous_system = nervous_system;
        return this;
    }

    private defineLocomotorSystem(
        locomotor_system: IQuestionAnamnesis[] = []
    ): this {
        if (!this.locomotor_system) return this

        this.anamnesis.locomotor_system = locomotor_system;
        return this;
    }

    static build(props: IAnamnesis): Anamnesis {
        const anamnesis = new Anamnesis(
            props.digestive_system,
            props.respiratory_system,
            props.urinary_system,
            props.nervous_system,
            props.locomotor_system,
        );

        return anamnesis
            .defineDigestiveSystem(props.anamnesis?.digestive_system)
            .defineRespiratorySystem(props.anamnesis?.respiratory_system)
            .defineUrinarySystem(props.anamnesis?.urinary_system)
            .defineNervousSystem(props.anamnesis?.nervous_system)
            .defineLocomotorSystem(props.anamnesis?.locomotor_system)
    }
}

export default Anamnesis;