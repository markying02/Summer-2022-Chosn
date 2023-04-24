/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGoals = /* GraphQL */ `
  mutation CreateGoals(
    $input: CreateGoalsInput!
    $condition: ModelGoalsConditionInput
  ) {
    createGoals(input: $input, condition: $condition) {
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
export const updateGoals = /* GraphQL */ `
  mutation UpdateGoals(
    $input: UpdateGoalsInput!
    $condition: ModelGoalsConditionInput
  ) {
    updateGoals(input: $input, condition: $condition) {
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
export const deleteGoals = /* GraphQL */ `
  mutation DeleteGoals(
    $input: DeleteGoalsInput!
    $condition: ModelGoalsConditionInput
  ) {
    deleteGoals(input: $input, condition: $condition) {
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
export const createNudge = /* GraphQL */ `
  mutation CreateNudge(
    $input: CreateNudgeInput!
    $condition: ModelNudgeConditionInput
  ) {
    createNudge(input: $input, condition: $condition) {
      id
      nudge
      createdAt
      owner
      updatedAt
    }
  }
`;
export const updateNudge = /* GraphQL */ `
  mutation UpdateNudge(
    $input: UpdateNudgeInput!
    $condition: ModelNudgeConditionInput
  ) {
    updateNudge(input: $input, condition: $condition) {
      id
      nudge
      createdAt
      owner
      updatedAt
    }
  }
`;
export const deleteNudge = /* GraphQL */ `
  mutation DeleteNudge(
    $input: DeleteNudgeInput!
    $condition: ModelNudgeConditionInput
  ) {
    deleteNudge(input: $input, condition: $condition) {
      id
      nudge
      createdAt
      owner
      updatedAt
    }
  }
`;
export const createChallenge = /* GraphQL */ `
  mutation CreateChallenge(
    $input: CreateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    createChallenge(input: $input, condition: $condition) {
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
export const updateChallenge = /* GraphQL */ `
  mutation UpdateChallenge(
    $input: UpdateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    updateChallenge(input: $input, condition: $condition) {
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
export const deleteChallenge = /* GraphQL */ `
  mutation DeleteChallenge(
    $input: DeleteChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    deleteChallenge(input: $input, condition: $condition) {
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
export const createChallengeUserData = /* GraphQL */ `
  mutation CreateChallengeUserData(
    $input: CreateChallengeUserDataInput!
    $condition: ModelChallengeUserDataConditionInput
  ) {
    createChallengeUserData(input: $input, condition: $condition) {
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
export const updateChallengeUserData = /* GraphQL */ `
  mutation UpdateChallengeUserData(
    $input: UpdateChallengeUserDataInput!
    $condition: ModelChallengeUserDataConditionInput
  ) {
    updateChallengeUserData(input: $input, condition: $condition) {
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
export const deleteChallengeUserData = /* GraphQL */ `
  mutation DeleteChallengeUserData(
    $input: DeleteChallengeUserDataInput!
    $condition: ModelChallengeUserDataConditionInput
  ) {
    deleteChallengeUserData(input: $input, condition: $condition) {
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
