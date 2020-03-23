module.exports = {
  register: require('./register'),
  login: require('./login'),
  sendMessage: require('./sendMessage'),
  createOrUpdateCampaign: require('./createOrUpdateCampaign'),
  applyToCampaign: require('./applyToCampaign'),
  updateBookingState: require('./updateBookingState'),
  updateUser: require('./updateUser'),
  completeOnboarding: require('./completeOnboarding'),
  requestInfluencers: require('./requestInfluencers'),
  createBillingMethod: require('./createBillingMethod'),
  updateUserAvatar: require('./updateUserAvatar'),
  requestInfluencerToCampaigns: require('./requestInfluencerToCampaigns'),
};
