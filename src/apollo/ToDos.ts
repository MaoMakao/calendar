import { gql } from '@apollo/client';

export const GET_ALL_TODOS = gql`
  query allDays {
    allDays {
      id
      todos
    }
  }
`;

export const GET_DAY_TODOS = gql`
  query Day($id: ID!) {
    Day(id: $id) {
      id
      todos
    }
  }
`;

export const CREATE_DAY = gql`
  mutation createDay($todos: JSON!) {
    createDay(todos: $todos) {
      todos
      id
    }
  }
`;

export const UPDATE_TODOS = gql`
  mutation updateDay($id: ID!, $todos: JSON) {
    updateDay(id: $id, todos: $todos) {
      todos
      id
    }
  }
`;

export const REMOVE_TODOS = gql`
  mutation removeDay($id: ID!) {
    removeDay(id: $id) {
      id
    }
  }
`;
