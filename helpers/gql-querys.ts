import { gql } from "graphql-request";

export const ACCOUNT_QUERY_BY_EMAIL = gql`
  query GetAccount($email: String!) {
    practice_accounts(
      where: {
        account: { email: { _eq: $email } }
      }
    ) {
      account {
        id
        password
        firstName
        lastName
        npi
        email
      }
      practice {
        id
        handler
      }
      suspended
    }
  }
`;

export const ACCOUNT_QUERY_BY_ID = gql`
  query GetAccount($accountId: uuid!) {
    practice_accounts(
      where: {
        account: { id: { _eq: $accountId } }
      }
    ) {
      account {
        id
        password
        firstName
        lastName
        npi
        email
      }
    }
  }
`;

export const REGISTER_ACCOUNT_MUTATION = gql`
  mutation RegisterAccount($email: String!, $password: String!, $firstName: String!, $lastName: String!, $npi: String) {
    insertedAccount: insert_accounts_one(object: {email: $email, password: $password, firstName: $firstName, lastName: $lastName, npi: $npi}) {
      id
    }
  }
`;

export const ASSOCIATE_PRACTICE_ACCOUNT_MUTATION = gql`
  mutation AssociatePracticeAccount(
    $accountId: uuid!, $practiceId: uuid!, $firstName: String!, $lastName: String!, $npi: String!, $title: String!, $role: String!, $pcp: Boolean!, $suspended: Boolean!
  ) {
    insert_practice_accounts_one(object: {
      accountId: $accountId,
      practiceId: $practiceId,
      firstName: $firstName,
      lastName: $lastName,
      npi: $npi,
      title: $title,
      role: $role,
      pcp: $pcp,
      suspended: $suspended
    }) {
      id
    }
  }
`;

export const ACCOUNT_BY_PRACTICE_ACCOUNT = gql`
  query accountByPracticeAccount($id: uuid!) {
    practiceAccount: practice_accounts_by_pk(id: $id) {
      accountId
    }
  }
`;

export const UPDATE_ACCOUNT_PASSWORD_MUTATION = gql`
  mutation UpdateAccountPassword($practiceAccountId: uuid!, $password: String!) {
    update_accounts_by_pk(pk_columns: {id: $practiceAccountId}, _set: {password: $password}) {
      id
    }
  }
`;

export const PRACTICE_BY_HANDLER = gql`
  query PracticeByHandler($handler: String!) {
    practices(where: { handler: { _eq: $handler } }) {
      id
    }
  }
`;

export const REGISTER_PRACTICE_ACCOUNT_MUTATION = gql`
  mutation RegisterPracticeAccount(
    $handler: String!, $position: String!, $profile: String!, $title: String!, $pcp: Boolean!, $suspended: Boolean!, $role: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!, $npi: String!
  ) {
    insert_practice_accounts_one(object: {
      handler: $handler,
      position: $position,
      profile: $profile,
      title: $title,
      pcp: $pcp,
      suspended: $suspended,
      role: $role,
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      npi: $npi
    }) {
      id
    }
  }
`;