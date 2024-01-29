// import { useRouter, useSearchParams } from "next/navigation";
// import LayoutTutor from "~/Layouts/LayoutTutor";
// import AppointmentsPage from "~/pages/Modules/veterinary/AppointmentsPage/Appointments";

// const AppointmentsNext = () => {
//     const search = useSearchParams();
//     const document = search.get("document") || "";
//     const pet = search.get("pet") || "";
//     const appointment_id = search.get("appointment_id") || "";

//     const { push } = useRouter();

//     if (!document || !pet) return push("/dashboard");

//     return (
//         <LayoutTutor>
//             <AppointmentsPage
//                 document={document}
//                 pet={pet}
//                 appointment_id={appointment_id}
//             />
//         </LayoutTutor>
//     );
// };

// export default AppointmentsNext;
