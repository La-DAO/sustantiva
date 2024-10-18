export type CreatePassportProfileData = {
  dynamicUserId: string
  dynamicWallet: string
  mainWallet: string
  verifiedWallets: string[]
  talentPassportId: number
  talentUserId: string
  name: string
  profilePictureUrl: string
  verified: boolean
  humanCheck: boolean
  score: number
  activityScore: number
  identityScore: number
  skillsScore: number
  nominationsReceived: number
  socialsLinked: number
  followerCount: number
  totalLimit?: number
}
