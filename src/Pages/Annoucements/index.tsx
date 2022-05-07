import styled from 'styled-components';
import Api from 'Api/api';
import { BubblesPageWrapper } from 'Components/BubblesPageWrapper';
import { StyledTitle } from 'Components/StyledTitle';
import { ChipInput } from 'Components/ChipInput';
import { JobCard } from 'Components/jobCard';
import { useQuery } from 'react-query';
import { Announcement } from 'Api/Types/Announcement';

const JobWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: wrap;
  justify-content: center;

  > div {
    margin: 2.8rem;
  }
`;

const StyledChipInput = styled(ChipInput)`
  max-width: 64rem;
  margin: auto;
  padding: 0 2.4rem;

  .MuiAutocomplete-inputRoot {
    border-radius: 1.2rem;
  }
`;

export const Annoucements = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, error, data } = useQuery<
    Announcement[],
    { message: string }
  >('repoData', () => Api.getAnnoucements([]));

  if (error) return <span>{'An error has occurred: ' + error.message}</span>;

  if (isLoading) return <span>'Loading...'</span>;

  return (
    <>
      <StyledTitle>Znajdź swój projekt</StyledTitle>
      <StyledChipInput />
      <BubblesPageWrapper>
        <JobWrapper>
          <>
            {data?.map(({ id, description, tags, startingPrice }) => (
              <JobCard
                key={id}
                projectName={id}
                description={description}
                type={tags.map(tag => tag.name).join(', ')}
                technology="Dowolna"
                revenue={startingPrice}
                id={id}
              />
            ))}
          </>
        </JobWrapper>
      </BubblesPageWrapper>
    </>
  );
};
