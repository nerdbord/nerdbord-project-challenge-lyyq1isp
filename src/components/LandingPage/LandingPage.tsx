"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./LandingPage.module.scss";
import { Logo } from "@/components/Logo/Logo";
import heroImage from "@/assets/images/heroImage.png";
import { Button } from "@/components/Button/Button";
import featureImage1 from "@/assets/images/featureImage1.png";
import featureImage2 from "@/assets/images/featureImage2.png";
import featureImage3 from "@/assets/images/featureImage3.png";
import familyImage from "@/assets/images/familyImage.png";
import businessmanImage from "@/assets/images/businessmanImage.png";
import girlImage from "@/assets/images/girlImage.png";
import joinUsImage from "@/assets/images/joinUsImage.png";
import { SignInWithButton } from "@/components/OAuth/SignInWithButton";
import { GoogleIcon, FacebookIcon } from "@/assets/icons";

export const LandingPage = () => {
	const router = useRouter();
	const currentYear = new Date().getFullYear();

	const handleCreateAccount = () => {
		router.push("/sign-up");
	};

	return (
		<>
			<header className={styles.header}>
				<Logo width={40} height={35} withText />
			</header>
			<main>
				<section className={styles.heroSection}>
					<Image src={heroImage} alt="hero image" width={414} height={367} />
					<div className={styles.heroBox}>
						<div>
							<h4>Skanuj, śledź, oszczędzaj</h4>
							<p>
								Nowoczesna aplikacja AI, która automatycznie podsumowuje Twoje miesięczne wydatki
							</p>
						</div>
						<Button variant="primary" className={styles.ctaBtn} onClick={handleCreateAccount}>
							Utwórz konto
						</Button>
					</div>
				</section>
				<section className={styles.featuresSection}>
					<ul className={styles.featuresList}>
						<li className={styles.featureItem}>
							<div>
								<h6>Automatyzacja śledzenia wydatków</h6>
								<p>
									Nie musisz ręcznie wprowadzać danych, co <span>oszczędza czas</span> i{" "}
									<span>minimalizuje ryzyko</span> błędów
								</p>
							</div>
							<Image src={featureImage1} alt="feature image" width={150} height={158} />
						</li>
						<li className={styles.featureItem}>
							<div>
								<h6>Szczegółowe statystyki</h6>
								<p>
									Wizualizacje danych: wykresy i diagramy, dzięki którym szybko{" "}
									<span>zrozumiesz swoje nawyki wydatkowe</span>
								</p>
							</div>
							<Image src={featureImage2} alt="feature image" width={150} height={158} />
						</li>
						<li className={styles.featureItem}>
							<div>
								<h6>Bez konieczności podpinania konta bankowego</h6>
								<p>
									Bezpieczna aplikacja, która dzięki funkcji skanowania paragonów{" "}
									<span>nie śledzi Twoich danych bankowych</span>
								</p>
							</div>
							<Image src={featureImage3} alt="feature image" width={150} height={158} />
						</li>
					</ul>
				</section>
				<section className={styles.forWhomSection}>
					<h4>Dla kogo stworzyliśmy AI ExpenseTracker?</h4>
					<ul className={styles.forWhomList}>
						<li className={styles.forWhomItem}>
							<Image src={familyImage} alt="for whom image" width={50} height={50} />
							<p>
								dla <span>rodzin</span>, które chcą optymalizować swoje finanse i planować wydatki
							</p>
						</li>
						<li className={styles.forWhomItem}>
							<Image src={businessmanImage} alt="for whom image" width={50} height={50} />
							<p>
								dla <span>przedsiębiorców</span>, którzy chcą skutecznie monitorować i kontrolować
								budżet
							</p>
						</li>
						<li className={styles.forWhomItem}>
							<Image src={girlImage} alt="for whom image" width={50} height={50} />
							<p>
								dla <span>młodych</span> ludzi, którzy stawiają pierwsze kroki w zarządzaniu swoimi
								finansami
							</p>
						</li>
					</ul>
				</section>
				<section className={styles.joinUsSection}>
					<Image src={joinUsImage} alt="join us image" width={414} height={233} />
					<div className={styles.joinUsBox}>
						<h5>
							Skanuj paragony <span>jednym kliknięciem i śledź swoje wydatki</span> w czasie
							rzeczywistym
						</h5>
						<Button variant="primary" className={styles.ctaBtn} onClick={handleCreateAccount}>
							Utwórz konto
						</Button>
						<div className={styles.divider}>-lub-</div>
						<div className={styles.buttonsWrapper}>
							<SignInWithButton
								strategy="oauth_google"
								text="Kontynuuj z Google"
								variant="outline"
								icon={<GoogleIcon />}
							/>

							<SignInWithButton
								strategy="oauth_facebook"
								text="Kontynuuj z Facebook"
								variant="primary"
								icon={<FacebookIcon />}
							/>
						</div>
					</div>
				</section>
			</main>
			<footer className={styles.footer}>
				<Logo width={40} height={35} withText />
				<p>@{currentYear}. All rights reserved</p>
			</footer>
		</>
	);
};
