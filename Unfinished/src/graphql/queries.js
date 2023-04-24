/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGoals = /* GraphQL */ `
  query GetGoals($id: ID!) {
    getGoals(id: $id) {
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
export const listGoalss = /* GraphQL */ `
  query ListGoalss(
    $filter: ModelGoalsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoalss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getNudge = /* GraphQL */ `
  query GetNudge($id: ID!) {
    getNudge(id: $id) {
      id
      nudge
      createdAt
      owner
      updatedAt
    }
  }
`;
export const listNudges = /* GraphQL */ `
  query ListNudges(
    $filter: ModelNudgeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNudges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nudge
        createdAt
        owner
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChallengeUserData = /* GraphQL */ `
  query GetChallengeUserData($id: ID!) {
    getChallengeUserData(id: $id) {
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
export const listChallengeUserDatas = /* GraphQL */ `
  query ListChallengeUserDatas(
    $filter: ModelChallengeUserDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallengeUserDatas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const nudgesForUser = /* GraphQL */ `
  query NudgesForUser(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNudgeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    nudgesForUser(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nudge
        createdAt
        owner
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChallenge = /* GraphQL */ `
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
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
export const listChallenges = /* GraphQL */ `
  query ListChallenges(
    $filter: ModelChallengeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallenges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
