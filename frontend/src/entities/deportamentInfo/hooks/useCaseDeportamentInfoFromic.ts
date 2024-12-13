import { IpointList } from '@shared/@types/points.type';
import { DeportamentApiRequest } from '@shared/api/deportament.api';
import { IgroopsDep } from 'features/deportamensListChoise/types/groopsdeportemets.type';
import { useFormik } from 'formik';
import { useEffect } from 'react';

export const useCaseDeportamentInfoFormic = (deportament: IgroopsDep | IpointList) => {
	const formik = useFormik({
		initialValues: {
			franchisee: '',
			businessType: '',
			address: '',
			OGRN: '',
			INN: '',
			establishmentAddress: '',
			format: '',
			totalArea: '',
			productionArea: '',
			hallArea: '',
			tableCount: '',
			seatCount: '',
			delivery: '',
			investmentAmount: '',
			averageCheck: '',
		},
		onSubmit: (values) => {
			requestSubmitDepInfo(values)
		},
	});

	const inputFromName = {
		franchisee: 'Франчайзи',
		businessType: 'Вид предпринимательства',
		address: 'Адрес',
		OGRN: 'ОГРН',
		INN: 'ИНН',
		establishmentAddress: 'Адрес заведения',
		format: 'Формат',
		totalArea: 'Квадратура',
		productionArea: 'Квадратура производства',
		hallArea: 'Квадратура зала',
		tableCount: 'Количество столов',
		seatCount: 'Количество посадочных мест',
		delivery: 'Доставка',
		investmentAmount: 'Сумма инвестиций при открытии',
		averageCheck: 'Средний чек за первую неделю',
	}


	const requestSubmitDepInfo = async (body: any) => {
		try {
			await DeportamentApiRequest.deportamentInfoData("info", deportament.departamentid, body)
		} catch (error) {

		}
	}

	useEffect(() => {
		(Object.keys(inputFromName) as Array<keyof typeof inputFromName>).map((key) => {
			if (deportament.info) {
				deportament.info[key] && formik.setFieldValue(`${key}`, deportament.info[key])
				deportament.info[key] && formik.setFieldValue(`${key}`, deportament.info[key])
			} else {
				formik.resetForm()
			}
		})
	}, [deportament])

	return { formik, inputFromName }
}


export const useDeportamentInfoSettingForm = (deportament: IgroopsDep) => {
	const formik = useFormik({
		initialValues: {
			yandex: '',
			quality: '',
			okupation: false,
			typemodel: ''
		},
		onSubmit: (values) => {
			requestSubmitDepInfo(values)
		},
	});

	const requestSubmitDepInfo = async (body: any) => {
		try {
			await DeportamentApiRequest.deportamentInfoData("setting", deportament.departamentid, body)
		} catch (error) {

		}
	}

	console.log(formik);

	useEffect(() => {

		if (deportament.setting) {
			formik.setFieldValue("yandex", deportament.setting.yandex)
			formik.setFieldValue("quality", deportament.setting.quality)
			formik.setFieldValue("okupation", deportament.setting.okupation)
			formik.setFieldValue("typemodel", deportament.setting.menu)
		}
	}, [deportament])

	return { formik }
}