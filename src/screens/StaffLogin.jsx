import { Link, useNavigate } from "react-router-dom";
import { GigniteLogo, PartnerLogos } from "../components/Brand";
import { LOGO, LOGO_ALT } from "../assets";
import { Icon } from "../components/ui";

export default function StaffLogin() {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-full grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
      {/* brand side — full bleed, logo carries it */}
      <section className="flex flex-col justify-between gap-8 bg-primary px-4 py-8 text-white sm:gap-12 sm:px-8 sm:py-12 xl:px-14">
        <GigniteLogo className="h-11 brightness-0 invert sm:h-16 lg:h-20" />

        <div>
          <h1 className="max-w-[16ch] text-[clamp(30px,4vw,50px)] font-extrabold leading-[1.02] tracking-[-0.014em]">
            The organiser's side of gIGNITE 2026.
          </h1>
          <p className="mt-6 max-w-[48ch] text-[15.5px] leading-relaxed text-white/70">
            Registrations, judging and exports in one place. Accounts are created by a Super Admin —
            there is no sign-up here.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          {[
            [LOGO.gadgeon, LOGO_ALT.gadgeon],
            [LOGO.fisat, LOGO_ALT.fisat],
            [LOGO.ieee, LOGO_ALT.ieee],
          ].map(([src, alt]) => (
            <span key={src} className="rounded-[11px] bg-white px-3 py-2 sm:px-4 sm:py-3">
              <img src={src} alt={alt} className="h-7 w-auto sm:h-10" />
            </span>
          ))}
        </div>
      </section>

      {/* form side */}
      <section className="flex items-center justify-center bg-paper px-4 py-12 sm:px-6 sm:py-16 xl:px-14">
        <div className="w-full max-w-[420px]">
          <h2 className="text-[24px] font-extrabold tracking-[-0.022em] sm:text-[28px]">Staff sign-in</h2>
          <p className="mt-2.5 text-[14.5px] text-ink-2">
            For organizers, judges, and volunteers only.
          </p>

          <form
            className="mt-9 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            <Field id="staff-email" label="Email" type="email" placeholder="you@fisat.ac.in" />
            <Field id="staff-password" label="Password" type="password" placeholder="••••••••" />

            <button
              type="submit"
              className="mt-2 flex min-h-[52px] items-center justify-center gap-2.5 pressable rounded-full bg-primary px-5 text-[15px] font-bold text-white transition hover:bg-primary-600"
            >
              Sign in
              <Icon.arrow className="h-4.5 w-4.5" />
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-3 border-t-[0.8px] border-line pt-6 text-[13.5px]">
            <Link to="/reset-password" className="font-medium text-sub hover:underline">
              Forgot your password?
            </Link>
            <p className="text-ink-3">
              Registering a team instead?{" "}
              <Link to="/register" className="font-medium text-sub hover:underline">
                Go to team registration
              </Link>
            </p>
          </div>

          <PartnerLogos size="sm" className="mt-12 lg:hidden" label="Presented by" />
        </div>
      </section>
    </div>
  );
}

export function Field({ id, label, type = "text", placeholder, help, ...rest }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="lbl">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="rounded-[11px] border-[0.8px] border-line bg-paper px-4 py-3 text-[15px] outline-none transition placeholder:text-ink-3 focus:border-primary"
        {...rest}
      />
      {help && <p className="text-[12.5px] text-ink-3">{help}</p>}
    </div>
  );
}
