export interface EntityData  {
    commonEntityDetails: CommonEntityDetails,
    serviceProviderEntityDetails: ServiceProviderEntityDetails,
    teamMembers: TeamMember [],
    services: Service [],
    documents: Document [],
    reviews: Review [],
    subscription: Subscription,
    billingHistory: BillingHistory []
    billingAddress : BillingAddress
  }


  type CommonEntityDetails = {
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
    country: string
    zipCode: string
    city: string
    state: string
    phoneNumber: string
  }

  type ServiceProviderEntityDetails = {
    irsLicense: string
    establishDate: string
    numberOfClients: string
    teamSize: number
  }

  type TeamMember = {
    teamMemberBasic: TeamMemberBasic
    teamMemberDetails: TeamMemberDetails
  }

  type TeamMemberBasic = {
    status: number
    teamMemberID: number
    uuid: string
    teamRoleTypeID: number
    sortOrderNumber: number
    showInTeam: number
  }
  
  type TeamMemberDetails = {
    userProfileImage: string
    userFirstName: string
    userLastName: string
    userTitle:string;
    userIntroduction:string;
    userProfileURLSlug:string
  }

  type Service =  {
    status: number
    serviceID: number
    sortOrderNumber: number
    serviceName: string
    serviceDescription: string
  }

  type Document = {
    status: number
    documentID: number
    documentType: string
    documentLocation: string
  }

  type Review = {
    reviewID: number
    reviewRating: number
    reviewComment: string
    reviewerProImage: string
    reviewerFirstName: string
    reviewerLastName: string
    reviewerTitle: string
    reviewerCompany: string
  }

  type Subscription = {
    entityID: number
    subscriptionPlanID: number
    monthlyPayLimit: number
    paymentMethods: PaymentMethod[]
    subscriptionID:number
  }

  type PaymentMethod = {
    status: number
    paymentMethodID: number
    gatewayReference: string
    cardType: number
    cardStatus: number
    cardLastFourDigits: number
    cardExpireDate: string
    defaultPaymentMethod: number
  }

  type BillingHistory =  {
    paymentID: number
    gatewayReference: string
    paymentStatus: number
    paymentDate: string
    paymentAmount: number
    paymentDescription: string
    invoiceLocation: string
  }

  export interface EditEntityData  {
    entityId: number
    common: Common
    serviceProvider: ServiceProvider
  }

  type Common = {
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

  type ServiceProvider = {
    irsLicense: string
    establishDate: string
    numberOfClients: string
    teamSize: number
  }

  type BillingAddress = {
    city: string
    state: string
    zipCode: string
    countryID: number
    nameOnInvoice: string
    streetAddress: string
    billingAddressID: number
  }