export interface Root {
    commonEntityDetails: CommonEntityDetails
    serviceProviderEntityDetails: ServiceProviderEntityDetails
    teamMembers: TeamMember[]
    services: Service[]
    documents: Document[]
    reviews: Review[]
    subscription: Subscription
    billingHistory: BillingHistory[]
  }
  
  export interface CommonEntityDetails {
    ownerUUId: string
    entityName: string
    urlSlug: string
    webURL: string
    focusIndustries: number[]
    categoryID: number
    entityLogo: string
    entityCoverPhoto: string
    tagLine: string
    acceptTerms: number
    companyDescription: string
    Country: string
    zipCode: string
    city: string
    state: string
    phoneNumber: string
  }
  
  export interface ServiceProviderEntityDetails {
    irsLicense: string
    establishDate: string
    numberOfClients: string
    teamSize: number
  }
  
  export interface TeamMember {
    TeamMemberBasic: TeamMemberBasic
    TeamMemberDetails: TeamMemberDetails
  }
  
  export interface TeamMemberBasic {
    status: number
    teamMemberID: number
    uuid: string
    teamRoleTypeID: number
    sortOrderNumber: number
    showInTeam: number
  }
  
  export interface TeamMemberDetails {
    userProfileImage: string
    userFirstName: string
    userLastName: string
  }
  
  export interface Service {
    status: number
    serviceID: number
    sortOrderNumber: number
    serviceName: string
    serviceDescription: string
  }
  
  export interface Document {
    status: number
    documentID: number
    documentType: string
    documentLocation: string
  }
  
  export interface Review {
    reviewID: number
    reviewRating: number
    reviewComment: string
    reviewerProImage: string
    reviewerFirstName: string
    reviewerLastName: string
    reviewerTitle: string
    reviewerCompany: string
  }
  
  export interface Subscription {
    entityID: number
    subscriptionPlanID: number
    monthlyPayLimit: number
    paymentMethods: PaymentMethod[]
  }
  
  export interface PaymentMethod {
    status: number
    paymentMethodID: number
    gatewayReference: string
    cardType: number
    cardStatus: number
    cardLastFourDigits: number
    cardExpireDate: string
    defaultPaymentMethod: number
  }
  
  export interface BillingHistory {
    paymentID: number
    gatewayReference: string
    paymentStatus: number
    paymentDate: string
    paymentAmount: number
    paymentDescription: string
    invoiceLocation: string
  }
  
  export interface EditRoot {
    entityId: number
    common: Common
    serviceProvider: ServiceProvider
  }
  
  export interface Common {
    entityName: string
    urlSlug: string
    webURL: string
    focusIndustries: number[]
    categoryID: number
    entityLogo: string
    entityCoverPhoto: string
    tagLine: string
    acceptTerms: number
    companyDescription: string
    countryID: number
    zipCode: string
    city: string
    state: string
    phoneNumber: string
  }
  
  export interface ServiceProvider {
    irsLicense: string
    establishDate: string
    numberOfClients: string
    teamSize: number
  }