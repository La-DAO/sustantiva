export type TalentPassportType = {
  activity_score: number
  identity_score: number
  skills_score: number
  calculating_score: boolean
  human_checkmark: boolean
  last_calculated_at: string
  main_wallet: string
  score: number
  passport_profile: {
    bio: string
    display_name: string
    location: string
    tags: [string]
  }
  verified_wallets: [string]
  merged: boolean
  passport_socials: [
    {
      follower_count: string
      following_count: string
      location: string
      profile_bio: string
      profile_display_name: string
      profile_image_url: string
      profile_name: string
      profile_url: string
      source: string
    },
  ]
}

export type FetchTalentPassportType = {
  passport: TalentPassportType
}
