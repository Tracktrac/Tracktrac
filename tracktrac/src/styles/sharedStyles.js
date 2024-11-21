import styled from 'styled-components';

// Shared styled components for all three components
export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isExpanded ? '1fr 1fr' : '1fr'};
  gap: 20px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
`;

export const Index = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  min-width: 40px;
  text-align: center;
  margin-right: 15px;

  @media (max-width: 480px) {
    margin: 0 0 10px 0;
  }
`;

export const Image = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-right: 16px;

  @media (max-width: 480px) {
    margin: 0 0 15px 0;
    width: 120px;
    height: 120px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  padding-right: 10px;

  @media (max-width: 480px) {
    padding-right: 0;
    width: 100%;
  }
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.3;
  max-height: 2.6em;

  @media (max-width: 480px) {
    text-align: center;
    font-size: 1rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    text-align: center;
    font-size: 0.85rem;
  }
`;