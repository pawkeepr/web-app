

import { useState } from 'react'
import { Switch } from '@headlessui/react'

type SwitchProps ={
  className: string
}

const ControlSwitch = ({className}: SwitchProps)=>{

  const [enabled, setEnabled] = useState<boolean>(false)

  return(
    <>
    <div className={className}>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-teal-900' : 'bg-teal-600'}
          relative inline-flex h-full w-full shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
    </>

  )
}

export default ControlSwitch