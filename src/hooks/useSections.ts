import { ISection } from "../types/section.interface";
import { useAppSelector } from "./useRedux";
import { useMemo } from 'react';



export const useBoardSections = (sectionIds: string[]): ISection[] => {
	const sections = useAppSelector(state => state.sections.sections);
	const sectionsArray = useMemo(() => {
		return sectionIds.map(id => { return sections[id] })
	}, [sectionIds, sections])
	return sectionsArray;
}

