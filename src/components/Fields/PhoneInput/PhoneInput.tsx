'use client'
import ReactPhoneInput from "react-phone-input-2"
import { Field } from "../Field"
//TODO implement translates ua | ru
import ru from "@/locales/countries/ru.json"
import uk from "@/locales/countries/ua.json"
import { useLang } from "@/hooks/useLang"
const countries = {
  uk, ru
}

interface IProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

const Phone = ({ className = "", size = "md", ...props }: IProps) => {
  const { lang } = useLang()
  return (
    <div className={`phone-input phone-input-${size} ${className} `}>
      <ReactPhoneInput
        country={'ua'}
        preferredCountries={['ua', 'pl', 'de', 'it', 'cz', 'us']}
        countryCodeEditable={false}
        localization={countries[lang]}
        {...props}
      />
    </div>
  );
}

const PhoneInput = (props: any) => <Field {...props} component={Phone} tag="input" />;

export { PhoneInput }
