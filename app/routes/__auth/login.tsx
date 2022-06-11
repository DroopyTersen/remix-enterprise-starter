import type { AppUser } from "~/features/auth/auth.types";
import { authSession } from "~/features/auth/authSession.server";
import { InputField } from "~/ui-toolkit/components/forms";
import { Surface } from "~/ui-toolkit/components/Surface/Surface";
import { useQueryParam } from "~/ui-toolkit/hooks/useQueryParam";
import { useValidatedForm } from "~/validation/useValidatedForm";
import { validate } from "~/validation/validate";
import type { FormValidators } from "~/validation/validation.types";

interface LoginFormValues {
  email: string;
  password: string;
}

let loginValidators: FormValidators<LoginFormValues> = {
  email: {
    required: "Please enter your email",
  },
  password: {
    required: "Please enter your password",
    minLength: { value: 6, message: "Your password must be at least 6 characters" },
  },
};

export default function LoginRoute() {
  let form = useValidatedForm<LoginFormValues>();
  let [returnTo] = useQueryParam("returnTo");
  return (
    <div className="p-5 bg-light h-100">
      <Surface className="w-100 mx-auto" style={{ maxWidth: "500px" }}>
        {/* <h1 className="text-primary text-center">Login</h1> */}
        <h1 className="text-primary fs-3 mb-4">Welcome to App Logo!</h1>
        <form.Form method="post">
          <fieldset>
            <input type="hidden" name="returnTo" value={returnTo} />
            <InputField
              autoFocus
              label="Email"
              placeholder="Enter your email"
              error={form.errors.email}
              {...form.register("email", loginValidators.email)}
            />
            <InputField
              label="Password"
              type="password"
              error={form.errors.password}
              {...form.register("password", loginValidators.password)}
            />
            <button className="btn btn-primary btn-lg w-100" type="submit">
              Login
            </button>
          </fieldset>
        </form.Form>
      </Surface>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  let [errors, hasErrors] = await validate(formData, loginValidators);
  if (hasErrors) return { errors };
  let returnTo = formData.get("returnTo") || "/";

  // replace this with your own login code
  let result = await fakeLogin(formData.get("email"), formData.get("password"));

  return authSession.create({ user: result.user, access_token: result.token }, returnTo);
};

const fakeLogin = async (
  email: string,
  password: string
): Promise<{ token: string; user: AppUser }> => {
  let user: AppUser = {
    id: email,
    email,
    role: "user",
  };
  if (email.includes("admin")) user.role = "admin";

  let token = "this_is_a_fake_token_for_an_api_service";

  return {
    token,
    user,
  };
};
