import { Input } from "@chakra-ui/input";

interface Props {
  value: string,
  onChange: (value: string) => void
  name: string
  placeholder?: string
  disabled?: boolean
}

export function InputTextControlled(props: Props){
  return <Input 
    placeholder={props.placeholder}
    name={props.name} 
    onChange={event => props.onChange(event.target.value)} 
    value={props.value}
    color="white"
    disabled={props.disabled ?? false}
    borderColor="purple.700"
    _focus={{
      borderColor: "white"
    }}
  />
}