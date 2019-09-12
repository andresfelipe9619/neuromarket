import React from 'react';
import Slider from 'react-animated-slider';
import './productImageSlider.css';

export default function ProductImage({src}) {
	if (Array.isArray(src)) {
		return (
			<Slider>
				{src.map((image, index) => (
					<img key={index} src={image} alt='products details' />
				))}
			</Slider>
		);
	} else {
		return (
			<div>
				<img src={src} width='100%' height='auto' alt='products details' />
			</div>
		);
	}
}
