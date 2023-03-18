import {
  GET_CONTACTS,
  GET_COMPANIES,
  GET_DEALS,
  GET_LEADS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_COMPANIES_SUCCESS,
  ADD_COMPANIES_FAIL,
  UPDATE_COMPANIES_SUCCESS,
  UPDATE_COMPANIES_FAIL,
  DELETE_COMPANIES_SUCCESS,
  DELETE_COMPANIES_FAIL,

  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,

  ADD_LEAD_SUCCESS,
  ADD_LEAD_FAIL,
  UPDATE_LEAD_SUCCESS,
  UPDATE_LEAD_FAIL,
  DELETE_LEAD_SUCCESS,
  DELETE_LEAD_FAIL,
} from "./actionType";

const INIT_STATE = {
  crmcontacts: [],
  companies: [],
  deals: [],
  leads: [],
  error: {},
};

const Crm = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CONTACTS:
          return {
            ...state,
            crmcontacts: action.payload.data,
            isContactCreated: false,
            isContactSuccess: true
          };
        case GET_COMPANIES:
          return {
            ...state,
            companies: action.payload.data,
            isCompaniesCreated: false,
            isCompaniesSuccess: true
          };
        case GET_DEALS:
          return {
            ...state,
            deals: action.payload.data,
          };
        case GET_LEADS:
          return {
            ...state,
            leads: action.payload.data,
            isLeadCreated: false,
            isLeadsSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_CONTACTS:
          return {
            ...state,
            error: action.payload.error,
            isContactCreated: false,
            isContactSuccess: false
          };
        case GET_COMPANIES:
          return {
            ...state,
            error: action.payload.error,
            isCompaniesCreated: false,
            isCompaniesSuccess: false
          };
        case GET_DEALS:
          return {
            ...state,
            error: action.payload.error,
          };
        case GET_LEADS:
          return {
            ...state,
            error: action.payload.error,
            isLeadCreated: false,
            isLeadsSuccess: false
          };
        default:
          return { ...state };
      }
    case GET_COMPANIES: {
      return {
        ...state,
        isCompaniesCreated: false
      };
    }
    case GET_DEALS: {
      return {
        ...state,
      };
    }
    case GET_LEADS:
      return {
        ...state,
        isLeadCreated: false
      };
    case ADD_COMPANIES_SUCCESS:
      return {
        ...state,
        isCompaniesCreated: true,
        companies: [...state.companies, action.payload.data],
      };

    case ADD_COMPANIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: state.companies.map(company =>
          company._id.toString() === action.payload.data._id.toString()
            ? { ...company, ...action.payload.data }
            : company
        ),
      };

    case UPDATE_COMPANIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter(
          company => company._id.toString() !== action.payload.companies.toString()
        ),
      };

    case DELETE_COMPANIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        isContactCreated: true,
        crmcontacts: [...state.crmcontacts, action.payload.data],
      };

    case ADD_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        crmcontacts: state.crmcontacts.map(contact =>
          contact._id.toString() === action.payload.data._id.toString()
            ? { ...contact, ...action.payload.data }
            : contact
        ),
      };

    case UPDATE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        crmcontacts: state.crmcontacts.filter(
          contact => contact._id.toString() !== action.payload.contact.toString()
        ),
      };

    case DELETE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_LEAD_SUCCESS:
      return {
        ...state,
        isLeadCreated: true,
        leads: [...state.leads, action.payload.data],
      };

    case ADD_LEAD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_LEAD_SUCCESS:
      return {
        ...state,
        leads: state.leads.map(lead =>
          lead._id.toString() === action.payload.data._id.toString()
            ? { ...lead, ...action.payload.data }
            : lead
        ),
      };

    case UPDATE_LEAD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_LEAD_SUCCESS:
      return {
        ...state,
        leads: state.leads.filter(
          lead => lead._id.toString() !== action.payload.leads.toString()
        ),
      };

    case DELETE_LEAD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Crm;
