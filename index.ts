import * as v from 'valibot'
import * as rx from 'rxjs'


const successObserver = new rx.Subject<UserInput>();
const errorObserver = new rx.Subject<string>();

successObserver.subscribe({
  next: (successObject) => {
    console.log(successObject);
  },
});

errorObserver.subscribe({
  next: (errorReason) => {
    console.log(errorReason);
  },
});

const userInput = v.object({
  userEmail: v.string([
    v.toTrimmed(),
    v.minLength(1, 'please input user name'),
    v.email('this is not email address'),
    v.endsWith('@gmail.com', 'this is not end with gmail'),
  ]),
  password: v.string([
    v.minLength(1, 'please enter your password'),
    v.minLength(8, 'password must be at least 8 characters'),
    v.regex(/[a-z]/, 'password must contain at least one lowercase letter'),
    v.regex(/[A-Z]/, 'password must contain at least one uppercase letter'),
    v.regex(/[0-9]/, 'password must contain at least one number'),
  ]),
  confirmPassword: v.string([
    v.minLength(1, 'please enter your confirmPassword'),
    v.minLength(8, 'confirmPassword must be at least 8 characters'),
    v.regex(/[a-z]/, 'confirmPassword must contain at least one lowercase letter'),
    v.regex(/[A-Z]/, 'confirmPassword must contain at least one uppercase letter'),
    v.regex(/[0-9]/, 'confirmPassword must contain at least one number'),
  ]),
  description: v.optional(v.string()),
  inputAnother: v.withDefault(v.enumType([
    '',
    'foo',
    'input',
  ], 'not include in enum'), ''),
}, [
  (input) => {
    if (input.password !== input.confirmPassword) {
      return {
        issue: {
          validation: 'custom',
          message: 'password not match',
          input,
        }
      }
    }
    return {
      output: input,
    }
  },
]);

export type UserInput = v.Input<typeof userInput>;

// const userEmail = v.pick(userInput, ['userName'])
// const userAnother = v.omit(userInput, ['userName'])
//
// type UserEmail = v.Input<typeof userEmail>;
// type UserAnother = v.Input<typeof userAnother>;


export const loginValidator = (inputValue: unknown) => {

  try {
    const result = v.parse(userInput, inputValue)
    successObserver.next(result);
    return true;
  } catch(errorIssues) {
    if (errorIssues instanceof v.ValiError) {
      errorObserver.next(errorIssues.message);
      return false;
    }
  }
}
