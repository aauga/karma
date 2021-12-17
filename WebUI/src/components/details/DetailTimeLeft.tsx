import moment from 'moment';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

interface DetailTimeLeftProps {
    expirationDate: string;
}

const getTimeleft = (date: moment.Moment) => {
    let currDate = moment();
    let daysLeft = date.diff(currDate, 'days');

    if (daysLeft !== 0) {
        return daysLeft + ' days left';
    }

    let minsLeft = date.diff(currDate, 'minutes');

    if (minsLeft !== 0) {
        return minsLeft + ' minutes left';
    }

    return date.diff(currDate, 'seconds') + ' seconds left';
};

const DetailTimeLeft = ({ expirationDate }: DetailTimeLeftProps) => {
    let date = moment(expirationDate);
    let formattedDate = date.format('YYYY-MM-DD HH:mm:ss Z');
    let timeleft = getTimeleft(date);

    const renderTooltip = (props: any) => (
        <Tooltip id='button-tooltip' {...props}>
            {formattedDate}
        </Tooltip>
    );

    return (
        <div className='d-flex align-items-center'>
            <AiOutlineClockCircle size={18} className='mr-2' />
            <OverlayTrigger placement='top' delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                <span style={{ fontSize: '15px', marginLeft: '.5rem' }}>{timeleft}</span>
            </OverlayTrigger>
        </div>
    );
};

export default DetailTimeLeft;
