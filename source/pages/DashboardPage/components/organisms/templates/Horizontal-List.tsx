
import { Tab } from '@headlessui/react'
import { useState } from "react";

import StepScheduledAll from "../steps/step-scheduled-all";
import StepScheduledCanceled from "../steps/step-scheduled-canceled";
import StepScheduledConfirmed from "../steps/step-scheduled-confirmed";
import StepScheduledDone from "../steps/step-scheduled-done";

function classNames(...classes : any[]) {
    return classes.filter(Boolean).join(' ')
  }


const HorizontalTabs = () => {

    let [categories] = useState({
        'Consultas Agendadas': [
          {
            id: 1,
            title: 'Consultas Agendadas',
            date: '5h ago',
            commentCount: 5,
            shareCount: 2,
          },
          {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: '2h ago',
            commentCount: 3,
            shareCount: 2,
          },
        ],
        'Consultas Canceladas': [
          {
            id: 1,
            title: 'Consultas Canceladas',
            date: 'Jan 7',
            commentCount: 29,
            shareCount: 16,
          },
          {
            id: 2,
            title: 'The most innovative things happening in coffee',
            date: 'Mar 19',
            commentCount: 24,
            shareCount: 12,
          },
        ],
        'Consultas Confirmadas': [
          {
            id: 1,
            title: 'Consultas Confirmadas',
            date: '2d ago',
            commentCount: 9,
            shareCount: 5,
          },
          {
            id: 2,
            title: "The worst advice we've ever heard about coffee",
            date: '4d ago',
            commentCount: 1,
            shareCount: 2,
          },
        ],
        'Consultas Finalizadas': [
            {
              id: 1,
              title: 'Consultas Finalizadas',
              date: '2d ago',
              commentCount: 9,
              shareCount: 5,
            },
            {
              id: 2,
              title: "The worst advice we've ever heard about coffee",
              date: '4d ago',
              commentCount: 1,
              shareCount: 2,
            },
          ],
      })

    return (
        <div className="w-full mt-2 rounded-md">
          <Tab.Group>
          <Tab.List className="flex  rounded-xl bg-primary-500 p-1">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                        'w-full rounded-lg py-2.5 text-sm leading-5 font-bold text-white',
                      'ring-white/60 ring-offset-2 focus:outline-none focus:ring-2',
                      selected
                      ? 'bg-white !text-secondary-500 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12]  hover:text-white'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white/60 ring-offset-2 focus:outline-none focus:ring-2'
                  )}
                >
                  <ul>
                    {posts.map((post) => (
                        <li key={'swka'}>
                            {post.title === 'Consultas Confirmadas' && <StepScheduledConfirmed props={ post }/>}
                            {post.title === 'Consultas Canceladas' && <StepScheduledCanceled props={ post }/>}
                            {post.title === 'Consultas Agendadas' && <StepScheduledAll props={ post }/>}
                            {post.title === 'Consultas Finalizadas' && <StepScheduledDone props={ post }/>}
                        </li>
    
                    ))}
                  </ul>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      )
}

export default HorizontalTabs