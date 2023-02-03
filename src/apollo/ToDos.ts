import { gql } from '@apollo/client';

export const GET_ALL_TODOS = gql`
  query allDays {
    allDays {
      id
      dayTime
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
  mutation createDay($todos: JSON!, $dayTime: String!) {
    createDay(todos: $todos, dayTime: $dayTime) {
      dayTime
      todos
      id
    }
  }
`;

export const UPDATE_TODOS = gql`
  mutation updateDay($id: ID!, $todos: JSON, $dayTime: String) {
    updateDay(id: $id, todos: $todos, dayTime: $dayTime) {
      dayTime
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
