import { useState } from 'react';
import styled from 'styled-components';
import Api from 'Api/api';
import { useQuery } from 'react-query';
import { Announcement } from 'Api/Types/Announcement';
import { BubblesPageWrapper } from 'Components/BubblesPageWrapper';
import { StyledTitle } from 'Components/StyledTitle';
import { ChipInput } from 'Components/ChipInput';
import { JobCard } from 'Components/jobCard';

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
  const [tagsQuery, setTagsQuery] = useState([] as string[]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, error, data } = useQuery<
    Announcement[],
    { message: string }
  >(['repoData', tagsQuery], () => Api.getAnnoucements(tagsQuery));

  const getTitle = () => {
    if (error)
      return (
        <StyledTitle>{'An error has occurred: ' + error.message}</StyledTitle>
      );

    if (isLoading) return <StyledTitle>Loading...</StyledTitle>;

    return 'Znajdź swój projekt';
  };

  return (
    <>
      <StyledTitle>{getTitle()}</StyledTitle>
      <StyledChipInput setTags={setTagsQuery} />
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
