import { useState } from 'react';
import styled from 'styled-components';
import Api from 'Api/api';
import { useQuery } from 'react-query';
import { Announcement } from 'Api/Types/Announcement';
import { BubblesPageWrapper } from 'Components/BubblesPageWrapper';
import { StyledTitle } from 'Components/StyledTitle';
import { ChipInput } from 'Components/ChipInput';
import { JobCard } from 'Components/jobCard';
import { CreateAnnoucementModal } from 'Components/CreateAnnoucementModal';
import { RegisterModal } from 'Components/RegisterModal';
import { LoginModal } from 'Components/LoginModal';

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
  padding: 0 2.4rem;
  width: 46rem;

  .MuiAutocomplete-inputRoot {
    border-radius: 1.2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Annoucements = () => {
  const [tagsQuery, setTagsQuery] = useState([] as string[]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, error, data } = useQuery<
    Announcement[],
    { message: string }
  >(['repoData', tagsQuery], () => Api.getAnnouncements(tagsQuery));

  const getTitle = () => {
    if (error) return <StyledTitle>{'Wystąpił błąd'}</StyledTitle>;

    if (isLoading) return <StyledTitle>Ładowanie...</StyledTitle>;

    return 'Znajdź swój projekt';
  };

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <StyledTitle>{getTitle()}</StyledTitle>
      <Wrapper>
        <StyledChipInput setTags={setTagsQuery} />
        <CreateAnnoucementModal />
      </Wrapper>
      <BubblesPageWrapper>
        <JobWrapper>
          <>
            {data?.map(({ id, title, description, tags, startingPrice }) => (
              <JobCard
                key={id}
                projectName={title}
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
