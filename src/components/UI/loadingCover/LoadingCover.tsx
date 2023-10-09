import React from 'react'
import { ClipLoader } from 'react-spinners'
import cl from './LoadingCover.module.scss';
const LoadingCover: React.FC = () => {
	return (
		<div className={cl.loader}>
			<ClipLoader
				size={150}
				color='green'
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	)
}

export default LoadingCover