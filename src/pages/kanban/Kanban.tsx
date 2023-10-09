import React from 'react';
import { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import { useBoardSections } from '../../hooks/useSections';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useDragHandler } from '../../hooks/useDragHandler';
import { fetchBoardData } from '../../store/boardSlice';

import Section from '../../components/section/Section';
import AddColumn from '../../components/addColumn/AddColumn';

import cl from './Kanban.module.scss';
import LoadingCover from '../../components/UI/loadingCover/LoadingCover';

const Kanban: React.FC = function () {
	const dispatch = useAppDispatch();
	const sectionsIds = useAppSelector(state => state.board.board.sectionIds);
	const sections = useBoardSections(sectionsIds);
	const isLoading = useAppSelector(state => state.board.loading);
	const { id } = useParams();
	useEffect(() => {
		if (id) {
			dispatch(fetchBoardData(id));
		}
	}, [id, dispatch])
	return (
		<DragDropContext
			onDragEnd={useDragHandler(sections, sectionsIds)} >
			<Droppable droppableId={id ? id : 'all-columns'} direction={'horizontal'} type={'column'}>
				{(provided) =>
					<div
						className={[cl.container, cl.kanbanContainer].join(' ')}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{sections.map((section, index) =>
							<Section
								key={section._id}
								sectionTitle={section.title}
								sectionId={section._id}
								tasksIds={section.tasksIds}
								boardId={id}
								index={index}
							></Section>)}
						{provided.placeholder}
						<AddColumn boardId={id} />
					</div>}
			</Droppable>
			{isLoading ?
				<LoadingCover />
				:
				<></>
			}
		</DragDropContext >
	);
}

export default Kanban;
