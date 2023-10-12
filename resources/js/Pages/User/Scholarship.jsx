import React, { useState, useEffect } from 'react';
import GuestLayoutComponent from '../../components/pagelayouts/GuestLayoutComponent';
import { ScholarshipApplication } from '../../components/user/ScholarshipApplication';
import { Link, router, useForm } from '@inertiajs/react'; // Import useForm
import classNames from 'classnames';
import { Button, TextField, Typography } from '@mui/material';

export default function Scholarship(props) {
    const { data, setData } = useForm({
      id: '',
    });

    const [errors,setErrors] = useState(props.errors);

    const [activeTab, setActiveTab] = useState(props.tab);

    useEffect(() => {
      setActiveTab(props.tab);
    }, [props.tab]);


    const tabContents = {

      'Apply or Update': {
        to: '/scholarship/apply',
        content: props.isScholarshipOpen?(<ScholarshipApplication  />):(<div className='flex justify-center m-10'><Typography>Not open now!! Check notices.</Typography></div>),
      },
      'Admit Card': {
        to: '/scholarship/admit-card/request-form',
        content: (
          <div className="flex flex-col space-y-2">
            <Typography variant='subtitle1' sx={{ fontWeight: 700, color: 'blue' }}>
              Request Admit Card
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.visit(`/scholarship/admit-card/${data.id}`);
              }}
            >
              <TextField
                id="id"
                name="id"
                label="Student ID"
                type="text"
                variant="outlined"
                fullWidth
                value={data.id}
                onChange={(e) => setData('id', e.target.value)}
                error={!!errors.id}
                helperText={errors.id || ' '}
              />
              <div className='flex justify-end'>
                <Button color='primary' variant='contained' type='submit'>
                  Request
                </Button>
              </div>
            </form>
          </div>
        ),
      },
      Result: {
        to: props.student ? `/scholarship/result/${props.student.id}`:'/scholarship/result',
        content: (
          <div>
            {props.student ? ( props.student.rank || props.student.result ?
            (
              <div>
                <Typography variant='h6'>Result Published::</Typography>
                <Typography variant='subtitle1'>
                  Result:{' '}
                  <span
                    className={
                      props.student.result === 'passed'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {props.student.result}
                  </span>
                </Typography>
                <Typography variant='subtitle1'>
                  Rank: <span>{props.student.rank}</span>
                </Typography>
              </div>
            ) : (
                <div className='flex justify-center p-10'><Typography variant='h6'>Result is not published!</Typography></div>
                )
                ):(
                <div className="flex flex-col space-y-2">
                <Typography variant='subtitle1' sx={{ fontWeight: 600, color: 'blue' }}>
                  Check Result
                </Typography>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    router.visit(`/scholarship/result/${data.id}`);
                  }}
                >
                  <TextField
                    id="id"
                    name="id"
                    label="Student ID"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={data.id}
                    onChange={(e) => setData('id', e.target.value)}
                    error={!!errors.id}
                    helperText={errors.id || ' '}

                  />
                  <div className='flex justify-end'>
                    <Button color='primary' variant='contained' type='submit'>
                      Proceed
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ),
      }
    };

    return (
      <GuestLayoutComponent scholarship="scholarship">
        <div className="block w-full">
          <div className="flex flex-col md:flex-row justify-between rounded-xl bg-blue-900/20 space-x-1 space-y-1 mb-10">
            {Object.keys(tabContents).map((tabName) => (
              <Link
                key={tabName}
                href={tabContents[tabName].to}
                className={classNames(
                  'w-full rounded-sm py-2.5 text-sm leading-5 font-semibold text-center transition duration-300',
                  'ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                  activeTab === tabName
                    ? 'bg-white text-black shadow-md ring-green-400 ring-1 ring-opacity-40'
                    : 'bg-white text-green-600 hover:bg-blue-100 hover:text-green-800'
                )}
              >
                {tabName}
              </Link>
            ))}
          </div>
          <div className="mt-2 max-h-[300px] overflow-y-auto">{tabContents[activeTab].content}</div>
        </div>
      </GuestLayoutComponent>
    );
  }

