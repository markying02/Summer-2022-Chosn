/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGoals = /* GraphQL */ `
  subscription OnCreateGoals($owner: String!) {
    onCreateGoals(owner: $owner) {
      id
      goal1
      goal2
      goal3
      relationshipType
      thirtyDaysTextSent
      identity
      name
      welcome
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateGoals = /* GraphQL */ `
  subscription OnUpdateGoals($owner: String!) {
    onUpdateGoals(owner: $owner) {
      id
      goal1
      goal2
      goal3
      relationshipType
      thirtyDaysTextSent
      identity
      name
      welcome
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteGoals = /* GraphQL */ `
  subscription OnDeleteGoals($owner: String!) {
    onDeleteGoals(owner: $owner) {
      id
      goal1
      goal2
      goal3
      relationshipType
      thirtyDaysTextSent
      identity
      name
      welcome
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateNudge = /* GraphQL */ `
  subscription OnCreateNudge($owner: String!) {
    onCreateNudge(owner: $owner) {
      id
      nudge
      createdAt
      owner
      updatedAt
    }
  }
`;
export const onUpdateNudge = /* GraphQL */ `
  subscription OnUpdateNudge($owner: String!) {
    onUpdateNudge(owner: $owner) {
      id
      nudge
      createdAt
      owner
      updatedAt
    }
  }
`;
export const onDeleteNudge = /* GraphQL */ `
  subscription OnDeleteNudge($owner: String!) {
    onDeleteNudge(owner: $owner) {
      id
      nudge
      createdAt
      owner
      updatedAt
    }
  }
`;
export const onCreateChallengeUserData = /* GraphQL */ `
  subscription OnCreateChallengeUserData($owner: String, $partners: String) {
    onCreateChallengeUserData(owner: $owner, partners: $partners) {
      id
      challenge
      partners
      ownerName
      partnerName
      partnerAccept
      startDate
      endDate
      results {
        id
        results
        user
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateChallengeUserData = /* GraphQL */ `
  subscription OnUpdateChallengeUserData($owner: String, $partners: String) {
    onUpdateChallengeUserData(owner: $owner, partners: $partners) {
      id
      challenge
      partners
      ownerName
      partnerName
      partnerAccept
      startDate
      endDate
      results {
        id
        results
        user
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteChallengeUserData = /* GraphQL */ `
  subscription OnDeleteChallengeUserData($owner: String, $partners: String) {
    onDeleteChallengeUserData(owner: $owner, partners: $partners) {
      id
      challenge
      partners
      ownerName
      partnerName
      partnerAccept
      startDate
      endDate
      results {
        id
        results
        user
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateChallenge = /* GraphQL */ `
  subscription OnCreateChallenge {
    onCreateChallenge {
      id
      name
      description
      startDate
      endDate
      days {
        id
        soloActivityType
        partnerActivityType
        soloActivityData
        partnerActivityData
      }
      page {
        preRegisterUrl
        title
        description
        primaryButtonText
        metaTitle
        metaDescription
        steps {
          title
          text
        }
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateChallenge = /* GraphQL */ `
  subscription OnUpdateChallenge {
    onUpdateChallenge {
      id
      name
      description
      startDate
      endDate
      days {
        id
        soloActivityType
        partnerActivityType
        soloActivityData
        partnerActivityData
      }
      page {
        preRegisterUrl
        title
        description
        primaryButtonText
        metaTitle
        metaDescription
        steps {
          title
          text
        }
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteChallenge = /* GraphQL */ `
  subscription OnDeleteChallenge {
    onDeleteChallenge {
      id
      name
      description
      startDate
      endDate
      days {
        id
        soloActivityType
        partnerActivityType
        soloActivityData
        partnerActivityData
      }
      page {
        preRegisterUrl
        title
        description
        primaryButtonText
        metaTitle
        metaDescription
        steps {
          title
          text
        }
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
